import { stringify } from 'qs';
import config from '../../config';
import { handleErrors } from '../../utils/fetch';

export const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';

const fetchMatchesRequest = () => {
  return {
    type: FETCH_MATCHES_REQUEST
  };
};

const fetchMatchesSuccess = (matches) => {
  return {
    type: FETCH_MATCHES_SUCCESS,
    matches
  };
};

const fetchMatchesFailure = (error) => {
  return {
    type: FETCH_MATCHES_FAILURE,
    error
  };
};

export const fetchMatches = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMatchesRequest());
    const { filters } = getState();
    const url = `${config.getApiMatchesUrl()}?${stringify(filters)}`;
    const { matches } = await fetch(url)
      .then(handleErrors)
      .then(json => json)
      .catch(error => dispatch(fetchMatchesFailure(error)));
    if (matches) {
      dispatch(fetchMatchesSuccess(matches));
    }
  };
};