const asyncHandler = require('express-async-handler')
const weatherService = require('../services/weatherService')

// Display weather on GET for city.
exports.city_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.city(req.params.country, req.params.city, req.params.state)
  res.json(weather)
})
