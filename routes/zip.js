/**
 * @swagger
 * tags:
 *   name: GeoLocation
 *   description: The geolocation weather API
 * /postal/{country}/{postal}:
 *   get:
 *     summary: Returns local weather for a given postal code (zip).
 *     tags: [Postal Code]
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