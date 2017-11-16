import config from '../../config';
import {
  SET_FILTER,
  REMOVE_FILTER,
  RESET_FILTERS
} from './actions';

export const getDefaultFilters = () => ({
  compatibilityScoreMin: config.COMPATIBILITY_SCORE_MIN,
  compatibilityScoreMax: config.COMPATIBILITY_SCORE_MAX,
  ageMin: config.AGE_MIN,
  heightMin: config.HEIGHT_MIN,
  distanceMin: 0,
  distanceMax: config.DISTANCE_MIN
});

const filters = (state = getDefaultFilters(), action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        [action.filter]: action.value
      };
    case REMOVE_FILTER:
      const filters = { ...state };
      delete filters[action.filter];
      return filters;
    case RESET_FILTERS:
      return action.filters;
    default:
      return state;
  }
}

export default filters;