const config = require('./config.json')
if (!config.OPEN_WEATHER_API_KEY) {
  console.log('Please set the OPEN_WEATHER_API_KEY variable')
  process.exit(1)
}

const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const logger = require('./services/loggerService').logger

const cityRoutes = require('./routes/city')
const geolocationRoutes = require('./routes/geolocation')
const postalRoutes = require('./routes/postal')

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Weather Express API with Swagger',
      version: '1.0.0',
      description:
        'This is a weather API application made with Express and documented with Swagger',
      license: {
        name: 'GPL-2.0-only',
        url: 'https://spdx.org/licenses/GPL-2.0-only.html'
      },
      contact: {
        name: 'Jack Henry',
        url: 'https://jackhenry.com',
        email: 'sayers@jackhenry.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const port = 3000
const specs = swaggerJsdoc(options)
const app = express()

app.use(logger)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

app.use('/city', cityRoutes)
app.use('/geolocation', geolocationRoutes)
app.use('/postal', postalRoutes)

app.get('*', (req, res) => {
  res.redirect(302, '/api-docs')
})

app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`)
})
