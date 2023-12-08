/**
 * Get weather information for a specific postal code.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to the weather information.
 */
const asyncHandler = require('express-async-handler')
const weatherService = require('../services/weatherService')

// Display weather on GET for postal code (zip).
exports.postal_get = asyncHandler(async (req, res, next) => {
  const weather = await weatherService.postal(req.params.country, req.params.postal)
  res.json(weather)
})
