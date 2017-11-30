import { stringify } from 'qs';
import 'whatwg-fetch';
import config from '../../config';
import { handleErrors } from '../../utils/fetch';

export const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';

export const fetchMatchesRequest = () => ({
  type: FETCH_MATCHES_REQUEST
});

export const fetchMatchesSuccess = (matches) => ({
  type: FETCH_MATCHES_SUCCESS,
  matches
});

export const fetchMatchesFailure = (ex) => ({
  type: FETCH_MATCHES_FAILURE,
  ex
});

export const fetchMatches = () => {
  return (dispatch, getState) => {
    dispatch(fetchMatchesRequest());
    const { filters } = getState();
    const url = filters
      ? `${config.getApiMatchesUrl()}?${stringify(filters)}`
      : config.getApiMatchesUrl();
    return fetch(url)
      .then(handleErrors)
      .then(json => dispatch(fetchMatchesSuccess(json.matches)))
      .catch(ex => dispatch(fetchMatchesFailure(ex)));
  };
};