const asyncHandler = require('express-async-handler');
const weatherService = require('../services/weatherService');

// Display weather on GET for geolocation.
exports.geolocation_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.geolocation(req.params.latitude, req.params.longitude);
  res.json(weather);
});