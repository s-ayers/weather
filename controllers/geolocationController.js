const asyncHandler = require('express-async-handler');

// Display weather on GET for geolocation.
exports.geolocation_get = asyncHandler(async (req, res, next) => {
  res.json(req.params);
});