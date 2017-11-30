import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import config from '../../config';
import * as actions from './actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should return a FETCH_MATCHES_REQUEST action', () => {
    const expectedAction = { type: actions.FETCH_MATCHES_REQUEST };

    const action = actions.fetchMatchesRequest();

    expect(action).toEqual(expectedAction);
  });

  it('should return a FETCH_MATCHES_FAILURE action', () => {
    const ex = {};
    const expectedAction = {
      type: actions.FETCH_MATCHES_FAILURE,
      ex
    };

    const action = actions.fetchMatchesFailure(ex);

    expect(action).toEqual(expectedAction);
  });

  it('should return a FETCH_MATCHES_SUCCESS action', () => {
    const matches = [];
    const expectedAction = {
      type: actions.FETCH_MATCHES_SUCCESS,
      matches
    };

    const action = actions.fetchMatchesSuccess(matches);

    expect(action).toEqual(expectedAction);
  });

  it('should dispatch a FETCH_MATCHES_REQUEST action then a FETCH_MATCHES_FAILURE action if the request fails', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject({ ok: false });
      });
    });
    const store = mockStore();
    const expectedActions = [
      { type: actions.FETCH_MATCHES_REQUEST },
      { type: actions.FETCH_MATCHES_FAILURE, ex: { ok: false } }
    ];

    return store.dispatch(actions.fetchMatches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch a FETCH_MATCHES_REQUEST action then a FETCH_MATCHES_SUCCESS action if the request succeeds', () => {
    const json = {
      matches: [
        { display_name: 'Caroline', age: 41 },
        { display_name: 'James', age: 25 }
      ]
    };
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: () => json
        });
      });
    });
    const expectedActions = [
      { type: actions.FETCH_MATCHES_REQUEST },
      { type: actions.FETCH_MATCHES_SUCCESS, matches: json.matches }
    ];
    const store = mockStore();

    return store.dispatch(actions.fetchMatches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});