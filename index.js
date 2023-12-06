const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        url: 'https://spdx.org/licenses/GPL-2.0-only.html',
      },
      contact: {
        name: 'Jack Henry',
        url: 'https://jackhenry.com',
        email: 'sayers@jackhenry.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const port = 3000;
const specs = swaggerJsdoc(options);
const app = express();
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`)
});
