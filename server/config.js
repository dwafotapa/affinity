const config = {};

// range values
config.COMPATIBILITY_SCORE_LOWER_BOUND = 0.01;
config.COMPATIBILITY_SCORE_UPPER_BOUND = 0.99;
config.AGE_LOWER_BOUND = 18;
config.AGE_UPPER_BOUND = 95;
config.HEIGHT_LOWER_BOUND = 135;
config.HEIGHT_UPPER_BOUND = 210;

// error messages
config.ERR_MSG_HAS_PHOTO_FILTER = 'has-photo must be true or false';
config.ERR_MSG_HAS_EXCHANGED_FILTER = 'has-exchanged must be true or false';
config.ERR_MSG_IS_FAVOURITE_FILTER = 'is-favourite must be true or false';
config.ERR_MSG_COMPATIBILITY_START_FILTER = 'compatibility-start must be a decimal between 0.01 and 0.99';
config.ERR_MSG_COMPATIBILITY_END_FILTER = 'compatibility-end must be a decimal between 0.01 and 0.99';
config.ERR_MSG_AGE_START_FILTER = 'age-start must be a number between 18 and 95';
config.ERR_MSG_AGE_END_FILTER = 'age-end must be a number between 18 and 95';
config.ERR_MSG_HEIGHT_START_FILTER = 'height-start must be a number between 135 and 210';
config.ERR_MSG_HEIGHT_END_FILTER = 'height-end must be a number between 135 and 210';
config.ERR_MSG_DISTANCE_START_FILTER = 'distance-start must be a number';
config.ERR_MSG_DISTANCE_END_FILTER = 'distance-end must be a number';

module.exports = config;