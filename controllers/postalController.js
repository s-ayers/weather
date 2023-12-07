const asyncHandler = require('express-async-handler');

// Display weather on GET for postal code (zip).
exports.postal_get = asyncHandler(async (req, res, next) => {
  res.json(req.params);
});