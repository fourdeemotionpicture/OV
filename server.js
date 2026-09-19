// ==============================================================================
// OV™ — LOCAL DEVELOPMENT & HYBRID PRODUCTION SERVER
// Serves static assets & delegates /api/* requests to unified serverless router
// Zero external runtime dependencies (pure Node.js http/fs/path/url)
// ==============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const apiHandler = require('./api/index');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// Decorate standard Node http response with Express/Vercel compatibility helpers
function adaptResponse(res) {
  if (!res.status) {
    res.status = function(code) {
      this.statusCode = code;
      return this;
    };
  }
  if (!res.json) {
    res.json = function(data) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }
  return res;
}

const server = http.createServer(async (req, res) => {
  adaptResponse(res);

  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // 1. Dispatch API routes directly to Serverless Router
    if (pathname.startsWith('/api')) {
      return await apiHandler(req, res);
    }

    // 2. Resolve static file path
    let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
      res.statusCode = 403;
      return res.end('Access Forbidden');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // Serve file if present
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', mime);
      return fs.createReadStream(filePath).pipe(res);
    }

    // Rewrite fallback to index.html for Single Page Application routing
    const indexPath = path.join(ROOT, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return fs.createReadStream(indexPath).pipe(res);
    }

    res.statusCode = 404;
    res.end('File Not Found');
  } catch (err) {
    console.error('[OV Server Error]', err);
    res.statusCode = 500;
    res.end('Internal Server Error: ' + err.message);
  }
});

server.listen(PORT, () => {
  console.log('\n===============================================================');
  console.log('  OV™ — ORIGINAL VERSION DEVELOPMENT SERVER');
  console.log(`  Local URL:    http://localhost:${PORT}`);
  console.log(`  API Health:   http://localhost:${PORT}/api/health`);
  console.log('===============================================================\n');
});

module.exports = server;
