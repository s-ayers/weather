/**
 * Get weather information for a specific city.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to the weather information in JSON format.
 */
const asyncHandler = require('express-async-handler')
const weatherService = require('../services/weatherService')

// Display weather on GET for city.
exports.city_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.city(req.params.country, req.params.city, req.params.state)
  res.json(weather)
})
