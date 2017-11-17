import { stringify } from 'qs';
import config from '../../config';
import goFetch from '../../utils/fetch';

export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';

const requestMatches = () => {
  return {
    type: REQUEST_MATCHES
  };
};

const receiveMatches = (matches) => {
  return {
    type: RECEIVE_MATCHES,
    items: matches
  };
};

export const fetchMatches = () => {
  return async (dispatch, getState) => {
    dispatch(requestMatches());
    const { filters } = getState();
    const url = `${config.getApiMatchesUrl()}?${stringify(filters)}`;
    const { matches } = await goFetch(url);
    dispatch(receiveMatches(matches));
  };
};