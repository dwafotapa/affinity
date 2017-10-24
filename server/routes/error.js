const express = require('express');
const router = express.Router();

router.use('error', function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});

router.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(err.status || 500);
    res.json({ error: err.message });
  }

  next();
});

module.exports = router;