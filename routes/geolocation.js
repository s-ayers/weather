const geolocationController = require('../controllers/geolocationController');
const express = require('express');
const router = express.Router();

router.get('/:latitude/:longitude', geolocationController.geolocation_get);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: GeoLocation
 *   description: The geolocation weather API
 * /geolocation/{latitude}/{longitude}:
 *   get:
 *     summary: Returns local weather for a given location.
 *     tags: [GeoLocation]
 *     parameters:
 *       - in : path
 *         name: latitude
 *         schema:
 *           type: string
 *         required: true
 *         description: Latitude
 *       - in : path
 *         name: longitude
 *         schema:
 *           type: string
 *         required: true
 *         description: Longitude
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *         - date
 *         - heat
 *         - condition
 *         - forecast
 *       properties:
 *         latitude:
 *           type: float
 *           description: Latitude
 *         longitude:
 *           type: float
 *           description: Longitude
 *         date:
 *           type: string
 *           description: String representation of date time
 *         heat:
 *           type: string
 *           description: Description of temperature
 *         condition:
 *           type: string
 *           description: Description of weather condition
 *         forecast:
 *           type: array
 *           description: Array of weather forecast
 *       example:
 *         latitude: 41.512
 *         longitude: -87.9656
 *         date: 2023-11-07 21:9:24
 *         heat: moderate
 *         condition: clear sky
 *         forecast:
 *          - heat: moderate
 *            condition: few clouds
 *            date: 2023-12-08 12:00:00
 *          - heat: moderate
 *            condition: light rain
 *            date: 2023-12-09 12:00:00
 *          - heat: moderate
 *            condition: scattered clouds
 *            date: 2023-12-10 12:00:00
 *          - heat: moderate
 *            condition: clear sky
 *            date: 2023-12-11 12:00:00
 *          - heat: moderate
 *            condition: overcast clouds
 *            date: 2023-12-12 12:00:00
 *
 */
