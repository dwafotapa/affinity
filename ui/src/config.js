const config = {
  API_BASE_URL: 'http://localhost:5000/api/',
  COMPATIBILITY_SCORE_MIN: 0.01,
  COMPATIBILITY_SCORE_MAX: 0.99,
  AGE_MIN: 18,
  AGE_MAX: 95,
  HEIGHT_MIN: 135,
  HEIGHT_MAX: 210,
  DISTANCE_MIN: 30,
  DISTANCE_MAX: 300
};

config.getApiBaseUrl = function() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.REACT_APP_API_BASE_URL;
    case 'development':
    default:
      return this.API_BASE_URL;
  }
};

export default config;