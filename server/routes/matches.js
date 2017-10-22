const express = require('express');
const json = require('../database/matches.json');
const getDistanceFromLatLonInKm = require('../utils');
const router = express.Router();

router.use('/', (req, res, next) => {
  const hasPhoto = req.query['has-photo'];
  req.matches = hasPhoto
    ? json.matches.filter(match => match.main_photo !== undefined)
    : json.matches;
  next();
});

router.use('/', (req, res, next) => {
  const hasExchanged = req.query['has-exchanged'];
  if (hasExchanged) {
    req.matches = req.matches.filter(match => match.contacts_exchanged !== undefined && match.contacts_exchanged > 0);
  }
  next();
});

router.use('/', (req, res, next) => {
  const isFavourite = req.query['is-favourite'];
  if (isFavourite) {
    req.matches = req.matches.filter(match => match.favourite !== undefined && match.favourite);
  }
  next();
});

router.use('/', (req, res, next) => {
  const compatibilityStart = req.query['compatibility-start'];
  if (compatibilityStart) {
    req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score >= compatibilityStart);
  }
  next();
});

router.use('/', (req, res, next) => {
  const compatibilityEnd = req.query['compatibility-end'];
  if (compatibilityEnd) {
    req.matches = req.matches.filter(match => match.compatibility_score !== undefined && match.compatibility_score <= compatibilityEnd);
  }
  next();
});

router.use('/', (req, res, next) => {
  const ageStart = req.query['age-start'];
  if (ageStart) {
    req.matches = req.matches.filter(match => match.age !== undefined && match.age >= ageStart);
  }
  next();
});

router.use('/', (req, res, next) => {
  const ageEnd = req.query['age-end'];
  if (ageEnd) {
    req.matches = req.matches.filter(match => match.age !== undefined && match.age <= ageEnd);
  }
  next();
});

router.use('/', (req, res, next) => {
  const heightStart = req.query['height-start'];
  if (heightStart) {
    req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm >= heightStart);
  }
  next();
});

router.use('/', (req, res, next) => {
  const heightEnd = req.query['height-end'];
  if (heightEnd) {
    req.matches = req.matches.filter(match => match.height_in_cm !== undefined && match.height_in_cm <= heightEnd);
  }
  next();
});

router.use('/', (req, res, next) => {
  const distanceStart = req.query['distance-start'];
  if (distanceStart) {
    const user = req.app.get('user');
    req.matches = req.matches.filter(match =>
      match.city !== undefined
      && getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon) >= distanceStart
    );
  }
  next();
});

router.use('/', (req, res, next) => {
  const distanceEnd = req.query['distance-end'];
  if (distanceEnd) {
    const user = req.app.get('user');
    req.matches = req.matches.filter(match =>
      match.city !== undefined
      && getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon) <= distanceEnd
    );
  }
  next();
});

router.get('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({
    matches: req.matches
  });
});


module.exports = router;