/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: GeoLocation
 *   description: The geolocation weather API
 * /geolocation/{latitute}/{longitude}:
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