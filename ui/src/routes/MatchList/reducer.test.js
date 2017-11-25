import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import {
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE
} from './actions';

describe('reducer', () => {
  const initialState = {
    isFetching: false,
    hasFetchFailed: false,
    items: []
  };
  deepFreeze(initialState);

  it('should return the initial state by default', () => {
    const expectedState = { ...initialState };

    const nextState = reducer(initialState, { type: 'DEFAULT' });

    expect(nextState).toEqual(expectedState);
  });

  it('should handle FETCH_MATCHES_REQUEST', () => {
    const expectedState = {
      ...initialState,
      isFetching: true
    };

    const nextState = reducer(initialState, { type: 'FETCH_MATCHES_REQUEST' });
    
    expect(nextState).toEqual(expectedState);
  });

  it('should handle FETCH_MATCHES_FAILURE', () => {
    const expectedState = {
      ...initialState,
      isFetching: false,
      hasFetchFailed: true
    };

    const nextState = reducer(initialState, { type: 'FETCH_MATCHES_FAILURE' });
    
    expect(nextState).toEqual(expectedState);
  });

  it('should handle FETCH_MATCHES_SUCCESS', () => {
    const expectedState = {
      ...initialState,
      isFetching: false,
      items: [
        {
          display_name: "Caroline"
        },
        {
          display_name: "Josephine"
        }
      ]
    };

    const nextState = reducer(initialState, {
      type: 'FETCH_MATCHES_SUCCESS',
      matches: expectedState.items
    });
    
    expect(nextState).toEqual(expectedState);
  });
});