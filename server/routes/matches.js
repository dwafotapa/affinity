require('../utils/Number.prototype');
const config = require('../config');
const express = require('express');
const db = require('../database/matches.json');
const getDistanceFromLatLonInKm = require('../utils');
const router = express.Router();

// inits the matches
router.get('/', (req, res, next) => {
  req.matches = db.matches;
  next();
});

// handles the hasPhoto parameter
router.get('/', (req, res, next) => {
  if (req.query['hasPhoto'] === undefined) {
    return next();
  }

  switch (req.query['hasPhoto']) {
    case 'true':
      req.matches = req.matches.filter(match => match.main_photo !== undefined);
      break;
    case 'false':
      return next();
    default:
      const err = new Error(config.ERR_MSG_HAS_PHOTO_FILTER);
      err.status = 400;
      return next(err);
  }

  next();
});

// handles the hasExchanged parameter
router.get('/', (req, res, next) => {
  if (req.query['hasExchanged'] === undefined) {
    return next();
  }
  
  switch (req.query['hasExchanged']) {
    case 'true':
      req.matches = req.matches.filter(match => match.contacts_exchanged !== undefined && match.contacts_exchanged > 0);
      break;
    case 'false':
      return next();
    default:
      const err = new Error(config.ERR_MSG_HAS_EXCHANGED_FILTER);
      err.status = 400;
      return next(err);
  }

  next();
});

// handles the isFavourite parameter
router.get('/', (req, res, next) => {
  if (req.query['isFavourite'] === undefined) {
    return next();
  }

  switch (req.query['isFavourite']) {
    case 'true':
      req.matches = req.matches.filter(match => match.favourite !== undefined && match.favourite);
    case 'false':
      return next();
    default:
      const err = new Error(config.ERR_MSG_IS_FAVOURITE_FILTER);
      err.status = 400;
      return next(err);
  }

  next();
});

// handles the compatibilityStart parameter
router.get('/', (req, res, next) => {
  if (req.query['compatibilityStart'] === undefined) {
    return next();
  }

  const compatibilityStart = Number(req.query['compatibilityStart']);
  if (isNaN(compatibilityStart) || compatibilityStart.isOutOfRange(config.COMPATIBILITY_SCORE_LOWER_BOUND, config.COMPATIBILITY_SCORE_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_COMPATIBILITY_START_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score >= compatibilityStart);
  next();
});

// handles the compatibilityEnd parameter
router.get('/', (req, res, next) => {
  if (req.query['compatibilityEnd'] === undefined) {
    return next();
  }

  const compatibilityEnd = Number(req.query['compatibilityEnd']);
  if (isNaN(compatibilityEnd) || compatibilityEnd.isOutOfRange(config.COMPATIBILITY_SCORE_LOWER_BOUND, config.COMPATIBILITY_SCORE_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_COMPATIBILITY_END_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score <= compatibilityEnd);
  next();
});

// handles the ageStart parameter
router.get('/', (req, res, next) => {
  if (req.query['ageStart'] === undefined) {
    return next();
  }

  const ageStart = Number(req.query['ageStart']);
  if (isNaN(ageStart) || ageStart.isOutOfRange(config.AGE_LOWER_BOUND, config.AGE_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_AGE_START_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.age !== undefined && match.age >= ageStart);
  next();
});

// handles the ageEnd parameter
router.get('/', (req, res, next) => {
  if (req.query['ageEnd'] === undefined) {
    return next();
  }

  const ageEnd = Number(req.query['ageEnd']);
  if (isNaN(ageEnd) || ageEnd.isOutOfRange(config.AGE_LOWER_BOUND, config.AGE_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_AGE_END_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.age !== undefined && match.age <= ageEnd);
  next();
});

// handles the heightStart parameter
router.get('/', (req, res, next) => {
  if (req.query['heightStart'] === undefined) {
    return next();
  }

  const heightStart = Number(req.query['heightStart']);
  if (isNaN(heightStart) || heightStart.isOutOfRange(config.HEIGHT_LOWER_BOUND, config.HEIGHT_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_HEIGHT_START_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm >= heightStart);
  next();
});

// handles the heightEnd parameter
router.get('/', (req, res, next) => {
  if (req.query['heightEnd'] === undefined) {
    return next();
  }

  const heightEnd = Number(req.query['heightEnd']);
  if (isNaN(heightEnd) || heightEnd.isOutOfRange(config.HEIGHT_LOWER_BOUND, config.HEIGHT_UPPER_BOUND)) {
    const err = new Error(config.ERR_MSG_HEIGHT_END_FILTER);
    err.status = 400;
    return next(err);
  }

  req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm <= heightEnd);
  next();
});

// handles the distanceStart parameter
router.get('/', (req, res, next) => {
  if (req.query['distanceStart'] === undefined) {
    return next();
  }

  const distanceStart = Number(req.query['distanceStart']);
  if (isNaN(distanceStart)) {
    const err = new Error(config.ERR_MSG_DISTANCE_START_FILTER);
    err.status = 400;
    return next(err);
  }
  
  const user = req.app.get('user');
  req.matches = req.matches.filter(match =>
    match.city !== undefined
    && getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon) >= distanceStart
  );
  next();
});

// handles the distanceEnd parameter
router.get('/', (req, res, next) => {
  if (req.query['distanceEnd'] === undefined) {
    return next();
  }

  const distanceEnd = Number(req.query['distanceEnd']);
  if (isNaN(distanceEnd)) {
    const err = new Error(config.ERR_MSG_DISTANCE_END_FILTER);
    err.status = 400;
    return next(err);
  }
  
  const user = req.app.get('user');
  req.matches = req.matches.filter(match =>
    match.city !== undefined
    && getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon) <= distanceEnd
  );
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