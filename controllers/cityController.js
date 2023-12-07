const asyncHandler = require('express-async-handler');

// Display weather on GET for city.
exports.city_get = asyncHandler(async (req, res, next) => {
  res.json({ "parms": req.params, "query": req.query});
});