const asyncHandler = require('express-async-handler');
const weatherService = require('../services/weatherService');

// Display weather on GET for postal code (zip).
exports.postal_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.postal(req.params.country, req.params.postal);
  res.json(weather);
});