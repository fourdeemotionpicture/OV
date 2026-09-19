// ==============================================================================
// OV™ — IMAGE UPLOAD API (/api/upload & /api/admin/upload)
// Saves base64 / binary uploaded images to static /images/uploads/ directory
// and returns permanent static URL path to eliminate base64 localStorage blowup.
// ==============================================================================

const fs = require('fs');
const path = require('path');
const { sendSuccess, sendBadRequest, sendError } = require('../response');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'images', 'uploads');

// Ensure upload directory exists
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (e) {
  console.error('[Upload API] Error creating uploads folder:', e);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendError(res, 'Method not allowed', 405);
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { /* ignore */ }
    }

    const { image, filename } = body || {};
    if (!image || typeof image !== 'string') {
      return sendBadRequest(res, 'Image data is required (base64 data URL)');
    }

    // Determine extension
    let ext = 'jpg';
    if (image.startsWith('data:image/png')) ext = 'png';
    else if (image.startsWith('data:image/webp')) ext = 'webp';
    else if (image.startsWith('data:image/gif')) ext = 'gif';
    else if (image.startsWith('data:image/svg')) ext = 'svg';

    // Strip data URL prefix
    const base64Data = image.replace(/^data:image\/[a-zA-Z+.-]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    if (!buffer || buffer.length === 0) {
      return sendBadRequest(res, 'Invalid base64 image data');
    }

    // Sanitize filename
    const safeBaseName = (filename || 'product')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 24);

    const generatedFilename = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${safeBaseName}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, generatedFilename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `images/uploads/${generatedFilename}`;

    return sendSuccess(res, {
      url: publicUrl,
      filename: generatedFilename,
      size: buffer.length
    }, 'Image uploaded and static URL generated successfully');

  } catch (err) {
    console.error('[Upload API Error]', err);
    return sendError(res, 'Failed to save uploaded image: ' + err.message, 500);
  }
};
