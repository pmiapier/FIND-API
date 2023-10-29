const { rateLimit } = require('express-rate-limit');
module.exports = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  message: { message: 'To many requests from this IP at the same time' },
});
