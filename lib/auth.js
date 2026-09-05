// ==============================================================================
// OV™ — AUTHENTICATION, JWT & RBAC PERMISSIONS ENGINE
// ==============================================================================

const crypto = require('crypto');

let bcrypt;
try {
  bcrypt = require('bcryptjs');
} catch (e) {
  // Graceful fallback if bcryptjs is not installed locally
  bcrypt = {
    hashSync: (pwd) => crypto.createHash('sha256').update(pwd + 'ov_salt').digest('hex'),
    compareSync: (pwd, hash) => crypto.createHash('sha256').update(pwd + 'ov_salt').digest('hex') === hash
  };
}

let jwt;
try {
  jwt = require('jsonwebtoken');
} catch (e) {
  // Built-in HMAC-SHA256 JWT fallback if jsonwebtoken is not installed locally
  jwt = {
    sign: (payload, secret, options = {}) => {
      const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
      const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + (7 * 24 * 3600) })).toString('base64url');
      const sig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
      return `${header}.${body}.${sig}`;
    },
    verify: (token, secret) => {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid token');
      const expectedSig = crypto.createHmac('sha256', secret).update(`${parts[0]}.${parts[1]}`).digest('base64url');
      if (expectedSig !== parts[2]) throw new Error('Invalid signature');
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');
      return payload;
    }
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'ov_jwt_development_secret_key_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  ORDER_MANAGER: 'ORDER_MANAGER',
  WAREHOUSE: 'WAREHOUSE',
  MARKETING: 'MARKETING',
  ACCOUNTANT: 'ACCOUNTANT',
  SUPPORT: 'SUPPORT'
};

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyPassword(plainPassword, hash) {
  if (!plainPassword || !hash) return false;
  return bcrypt.compareSync(plainPassword, hash);
}

function generateToken(userPayload) {
  return jwt.sign(
    {
      id: userPayload.id,
      email: userPayload.email,
      name: userPayload.name,
      role: userPayload.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function verifyAuthToken(req) {
  // Check Authorization Bearer header or Cookie
  let token = null;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.headers.cookie) {
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, val] = cookie.trim().split('=');
      acc[key] = val;
      return acc;
    }, {});
    token = cookies.ov_admin_token || cookies.token;
  }

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, allowedRoles = []) {
  const user = verifyAuthToken(req);
  if (!user) {
    res.setHeader('Content-Type', 'application/json');
    res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
    return null;
  }

  if (allowedRoles.length > 0) {
    // Owner always has permission for everything
    if (user.role !== ROLES.OWNER && !allowedRoles.includes(user.role)) {
      res.setHeader('Content-Type', 'application/json');
      res.status(403).json({ success: false, message: `Access denied. Requires one of roles: ${allowedRoles.join(', ')}` });
      return null;
    }
  }

  return user;
}

module.exports = {
  ROLES,
  hashPassword,
  verifyPassword,
  generateToken,
  verifyAuthToken,
  requireAuth
};
