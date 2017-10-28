const config = {};

// range values
config.COMPATIBILITY_SCORE_MIN = 0.01;
config.COMPATIBILITY_SCORE_MAX = 0.99;
config.AGE_MIN = 18;
config.AGE_MAX = 95;
config.HEIGHT_MIN = 135;
config.HEIGHT_MAX = 210;

// error messages
config.ERR_MSG_PARAM_HAS_PHOTO = 'hasPhoto must be true or false';
config.ERR_MSG_PARAM_HAS_EXCHANGED = 'hasExchanged must be true or false';
config.ERR_MSG_PARAM_IS_FAVOURITE = 'isFavourite must be true or false';
config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MIN = 'compatibilityScoreMin must be a decimal between 0.01 and 0.99';
config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MAX = 'compatibilityScoreMax must be a decimal between 0.01 and 0.99';
config.ERR_MSG_PARAM_AGE_MIN = 'ageMin must be a number between 18 and 95';
config.ERR_MSG_PARAM_AGE_MAX = 'ageMax must be a number between 18 and 95';
config.ERR_MSG_PARAM_HEIGHT_MIN = 'heightMin must be a number between 135 and 210';
config.ERR_MSG_PARAM_HEIGHT_MAX = 'heightMax must be a number between 135 and 210';
config.ERR_MSG_PARAM_DISTANCE_MIN = 'distanceMin must be a number';
config.ERR_MSG_PARAM_DISTANCE_MAX = 'distanceMax must be a number';

module.exports = config;