import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import config from '../../config';
import * as actions from './actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Matches/actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create a FETCH_MATCHES_REQUEST action, then a FETCH_MATCHES_FAILURE action if the request fails', () => {
    const expectedActions = [
      { type: actions.FETCH_MATCHES_REQUEST },
      { type: actions.FETCH_MATCHES_FAILURE, ex: new TypeError('Network request failed') }
    ];
    const store = mockStore({ matches: [] });

    return store.dispatch(actions.fetchMatches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create a FETCH_MATCHES_REQUEST action, then a FETCH_MATCHES_SUCCESS action if the request succeeds', () => {
    const data = [
      { display_name: 'Caroline', age: 41 },
      { display_name: 'James', age: 25 }
    ];
    fetchMock.getOnce(config.getApiMatchesUrl(), { matches: data });
    const expectedActions = [
      { type: actions.FETCH_MATCHES_REQUEST },
      { type: actions.FETCH_MATCHES_SUCCESS, matches: data }
    ];
    const store = mockStore({ matches: [] });

    return store.dispatch(actions.fetchMatches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});