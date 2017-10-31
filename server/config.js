module.exports = {
  // range values
  COMPATIBILITY_SCORE_MIN: 0.01,
  COMPATIBILITY_SCORE_MAX: 0.99,
  AGE_MIN: 18,
  AGE_MAX: 95,
  HEIGHT_MIN: 135,
  HEIGHT_MAX: 210,
  
  // error messages
  ERR_MSG_PARAM_HAS_PHOTO: 'hasPhoto must be true or false',
  ERR_MSG_PARAM_HAS_EXCHANGED: 'hasExchanged must be true or false',
  ERR_MSG_PARAM_IS_FAVOURITE: 'isFavourite must be true or false',
  ERR_MSG_PARAM_COMPATIBILITY_SCORE_MIN: 'compatibilityScoreMin must be a decimal between 0.01 and 0.99',
  ERR_MSG_PARAM_COMPATIBILITY_SCORE_MAX: 'compatibilityScoreMax must be a decimal between 0.01 and 0.99',
  ERR_MSG_PARAM_AGE_MIN: 'ageMin must be a number between 18 and 95',
  ERR_MSG_PARAM_AGE_MAX: 'ageMax must be a number between 18 and 95',
  ERR_MSG_PARAM_HEIGHT_MIN: 'heightMin must be a number between 135 and 210',
  ERR_MSG_PARAM_HEIGHT_MAX: 'heightMax must be a number between 135 and 210',
  ERR_MSG_PARAM_DISTANCE_MIN: 'distanceMin must be a number',
  ERR_MSG_PARAM_DISTANCE_MAX: 'distanceMax must be a number'
};