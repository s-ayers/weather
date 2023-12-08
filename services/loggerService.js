/**
 * Creates a logger using Morgan middleware with a rotating file stream.
 */

const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

/**
 * Creates a rotating file stream for logging access requests.
 * @type {object}
 * @property {string} interval - The interval at which the log files should rotate (e.g., '1d' for daily rotation).
 * @property {string} path - The path to the directory where the log files should be stored.
 */
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, '../logs')
})

/**
 * Middleware function that logs HTTP requests and responses.
 * @type {function}
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function.
 */
exports.logger = morgan('combined', { stream: accessLogStream })
