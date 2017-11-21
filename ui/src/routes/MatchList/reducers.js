import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from './actions';

const initialState = {
  isFetching: false,
  hasFetchFailed: false,
  items: []
};

const matches = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MATCHES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_MATCHES_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: true
      };
    case FETCH_MATCHES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetchFailed: false,
        items: action.matches
      };
    default:
      return state;
  }
}

export default matches;