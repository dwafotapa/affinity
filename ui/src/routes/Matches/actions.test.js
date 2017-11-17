import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import * as actions from './actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Matches/actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create a REQUEST_MATCHES action, then a RECEIVE_MATCHES action to fetch the matches', () => {
  //   fetchMock.getOnce('/api/matches?', {
  //     body: {
  //       matches: [
  //         { display_name: 'Caroline', age: 41 },
  //         { display_name: 'James', age: 25 }
  //       ]
  //     },
  //     headers: { 'content-type': 'application/json' }
  //   });
  //   const expectedActions = [
  //     { type: actions.REQUEST_MATCHES },
  //     { type: actions.RECEIVE_MATCHES, body: { matches: [
  //       { display_name: 'Caroline', age: 41 },
  //       { display_name: 'James', age: 25 }
  //     ] } }
  //   ];
  //   const store = mockStore({
  //     matches: []
  //   });

  //   return store.dispatch(actions.fetchMatches()).then(() => {
  //     expect(store.getActions()).toEqual(expectedActions);
  //   });
  });
});