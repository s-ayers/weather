const postalController = require('../controllers/postalController');
const express = require('express');
const router = express.Router();

router.get('/:country/:postal', postalController.postal_get);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Postal
 *   description: The postal weather API
 * /postal/{country}/{postal}:
 *   get:
 *     summary: Returns local weather for a given postal code (zip).
 *     tags: [Postal]
 *     parameters:
 *       - in: path
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         default: us
 *         description: Country code
 *       - in: path
 *         name: postal
 *         schema:
 *         type: string
 *         required: true
 *         description: Postal code (zip)
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