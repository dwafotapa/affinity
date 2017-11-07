const express = require('express');
const haversine = require('haversine');
const config = require('../config');
const db = require('../database/matches.json');
const createError = require('../utils/error');
const router = express.Router();
const NumberUtils = require('../utils/Number.utils');

// inits the matches
router.get('/', (req, res, next) => {
  req.matches = db.matches;
  next();
});

// handles the hasPhoto parameter
router.get('/', (req, res, next) => {
  if (req.query.hasPhoto === undefined) {
    return next();
  }

  switch (req.query.hasPhoto) {
    case 'true':
      req.matches = req.matches.filter(match => match.main_photo);
      break;
    case 'false':
      req.matches = req.matches.filter(match => !match.main_photo);
      break;
    default:
      const err = createError(config.ERR_MSG_PARAM_HAS_PHOTO, 400);
      return next(err);
  }

  next();
});

// handles the hasExchanged parameter
router.get('/', (req, res, next) => {
  if (req.query.hasExchanged === undefined) {
    return next();
  }
  
  switch (req.query.hasExchanged) {
    case 'true':
      req.matches = req.matches.filter(match => match.contacts_exchanged && match.contacts_exchanged > 0);
      break;
    case 'false':
      req.matches = req.matches.filter(match => !match.contacts_exchanged && match.contacts_exchanged === 0);
      break;
    default:
      const err = createError(config.ERR_MSG_PARAM_HAS_EXCHANGED, 400);
      return next(err);
  }

  next();
});

// handles the isFavourite parameter
router.get('/', (req, res, next) => {
  if (req.query.isFavourite === undefined) {
    return next();
  }

  switch (req.query.isFavourite) {
    case 'true':
      req.matches = req.matches.filter(match => match.favourite);
      break;      
    case 'false':
      req.matches = req.matches.filter(match => !match.favourite);
      break;
    default:
      const err = createError(config.ERR_MSG_PARAM_IS_FAVOURITE, 400);
      return next(err);
  }

  next();
});

// handles the compatibilityScoreMin parameter
router.get('/', (req, res, next) => {
  if (req.query.compatibilityScoreMin === undefined) {
    return next();
  }

  const compatibilityScoreMin = Number(req.query.compatibilityScoreMin);
  const range = {
    min: config.COMPATIBILITY_SCORE_MIN,
    max: config.COMPATIBILITY_SCORE_MAX
  };
  if (isNaN(compatibilityScoreMin) || NumberUtils.isOutOfRange(compatibilityScoreMin, range)) {
    const err = createError(config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MIN, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score >= compatibilityScoreMin);
  next();
});

// handles the compatibilityScoreMax parameter
router.get('/', (req, res, next) => {
  if (req.query.compatibilityScoreMax === undefined) {
    return next();
  }

  const compatibilityScoreMax = Number(req.query.compatibilityScoreMax);
  const range = {
    min: config.COMPATIBILITY_SCORE_MIN,
    max: config.COMPATIBILITY_SCORE_MAX
  };
  if (isNaN(compatibilityScoreMax) || NumberUtils.isOutOfRange(compatibilityScoreMax, range)) {
    const err = createError(config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MAX, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score <= compatibilityScoreMax);
  next();
});

// handles the ageMin parameter
router.get('/', (req, res, next) => {
  if (req.query.ageMin === undefined) {
    return next();
  }

  const ageMin = Number(req.query.ageMin);
  const range = {
    min: config.AGE_MIN,
    max: config.AGE_MAX
  };
  if (isNaN(ageMin) || NumberUtils.isOutOfRange(ageMin, range)) {
    const err = createError(config.ERR_MSG_PARAM_AGE_MIN, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.age !== undefined && match.age >= ageMin);
  next();
});

// handles the ageMax parameter
router.get('/', (req, res, next) => {
  if (req.query.ageMax === undefined) {
    return next();
  }

  const ageMax = Number(req.query.ageMax);
  const range = {
    min: config.AGE_MIN,
    max: config.AGE_MAX
  };
  if (isNaN(ageMax) || NumberUtils.isOutOfRange(ageMax, range)) {
    const err = createError(config.ERR_MSG_PARAM_AGE_MAX, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.age !== undefined && match.age <= ageMax);
  next();
});

// handles the heightMin parameter
router.get('/', (req, res, next) => {
  if (req.query.heightMin === undefined) {
    return next();
  }

  const heightMin = Number(req.query.heightMin);
  const range = {
    min: config.HEIGHT_MIN,
    max: config.HEIGHT_MAX
  };
  if (isNaN(heightMin) || NumberUtils.isOutOfRange(heightMin, range)) {
    const err = createError(config.ERR_MSG_PARAM_HEIGHT_MIN, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm >= heightMin);
  next();
});

// handles the heightMax parameter
router.get('/', (req, res, next) => {
  if (req.query.heightMax === undefined) {
    return next();
  }

  const heightMax = Number(req.query.heightMax);
  const range = {
    min: config.HEIGHT_MIN,
    max: config.HEIGHT_MAX
  };
  if (isNaN(heightMax) || NumberUtils.isOutOfRange(heightMax, range)) {
    const err = createError(config.ERR_MSG_PARAM_HEIGHT_MAX, 400);
    return next(err);
  }

  req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm <= heightMax);
  next();
});

// handles the distanceMin parameter
router.get('/', (req, res, next) => {
  if (req.query.distanceMin === undefined) {
    return next();
  }

  const distanceMin = Number(req.query.distanceMin);
  if (isNaN(distanceMin)) {
    const err = createError(config.ERR_MSG_PARAM_DISTANCE_MIN, 400);
    return next(err);
  }
  
  const user = req.app.get('user');
  const start = {
    latitude: user.city.lat,
    longitude: user.city.lon
  };
  req.matches = req.matches.filter(match => {
    const end = {
      latitude: match.city.lat,
      longitude: match.city.lon
    };
    return (match.city !== undefined) && (haversine(start, end) >= distanceMin);
  });
  next();
});

// handles the distanceMax parameter
router.get('/', (req, res, next) => {
  if (req.query.distanceMax === undefined) {
    return next();
  }

  const distanceMax = Number(req.query.distanceMax);
  if (isNaN(distanceMax)) {
    const err = createError(config.ERR_MSG_PARAM_DISTANCE_MAX, 400);
    return next(err);
  }
  
  const user = req.app.get('user');
  const start = {
    latitude: user.city.lat,
    longitude: user.city.lon
  };
  req.matches = req.matches.filter(match => {
    const end = {
      latitude: match.city.lat,
      longitude: match.city.lon
    };
    return (match.city !== undefined) && (haversine(start, end) <= distanceMax);
  });
  next();
});

// returns the filtered matches
router.get('/', (req, res, next) => {
  res.json({ matches: req.matches });
});

// handles any errors in the request
router.use(function (err, req, res, next) {
  res.status(err.status || 400);
  res.json({
    error: {
      status: err.status,
      message: err.message
    }
  });
});

module.exports = router;