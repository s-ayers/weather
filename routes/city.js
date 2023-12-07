const cityController = require('../controllers/cityController');
const express = require('express');
const router = express.Router();

router.get('/:country/:city', cityController.city_get);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: City
 *   description: The geolocation weather API
 * /city/{country}/{city}:
 *   get:
 *     summary: Returns local weather for a given city.
 *     tags: [City]
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         default: us
 *         description: Country code
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: State
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: City
 *     responses:
 *       200:
 *         description: Get weather for location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       500:
 *         description: Some server error
 *
 */