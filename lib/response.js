// ==============================================================================
// OV™ — API RESPONSE HELPER
// ==============================================================================

function sendSuccess(res, data = null, message = 'Success', statusCode = 200) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
}

function sendError(res, message = 'An error occurred', statusCode = 500, errors = null) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
}

function sendUnauthorized(res, message = 'Unauthorized access') {
  return sendError(res, message, 401);
}

function sendForbidden(res, message = 'Forbidden: insufficient permissions') {
  return sendError(res, message, 403);
}

function sendNotFound(res, message = 'Resource not found') {
  return sendError(res, message, 404);
}

function sendBadRequest(res, message = 'Invalid request parameters', errors = null) {
  return sendError(res, message, 400, errors);
}

module.exports = {
  sendSuccess,
  sendError,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendBadRequest
};
