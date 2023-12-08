/**
 * Get weather information based on geolocation coordinates.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to the weather information in JSON format.
 */
const asyncHandler = require('express-async-handler')
const weatherService = require('../services/weatherService')

// Display weather on GET for geolocation.
exports.geolocation_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.geolocation(req.params.latitude, req.params.longitude)
  res.json(weather)
})
