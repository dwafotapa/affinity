import reducer, { getDefaultFilters } from './reducers';
import * as actions from './actions';

describe('Sidebar/reducers', () => {
  it('should return the initial state', () => {
    const expectedState = getDefaultFilters();

    const nextState = reducer(getDefaultFilters(), {});

    expect(nextState).toEqual(expectedState);
  });

  it('should handle SET_FILTER', () => {
    const action = {
      type: actions.SET_FILTER,
      filter: 'hasPhoto',
      value: true
    };
    const expectedState = { hasPhoto: true };

    const nextState = reducer({}, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should handle SET_FILTER', () => {
    const action = {
      type: actions.SET_FILTER,
      filter: 'isFavourite',
      value: true
    };
    const expectedState = {
      hasPhoto: true,
      isFavourite: true
    };

    const nextState = reducer({ hasPhoto: true }, action);

    expect(nextState).toEqual(expectedState);
  });


  it('should handle REMOVE_FILTER', () => {
    const action = {
      type: actions.REMOVE_FILTER,
      filter: 'hasPhoto'
    };

    const nextState = reducer({ hasPhoto: true }, action);

    expect(nextState).toEqual({});
  });

  it('should handle REMOVE_FILTER', () => {
    const action = {
      type: actions.REMOVE_FILTER,
      filter: 'isFavourite'
    };
    const state = {
      hasPhoto: true,
      isFavourite: true
    };
    const expectedState = { hasPhoto: true };

    const nextState = reducer(state, action);
    
    expect(nextState).toEqual(expectedState);
  });

  it('should handle RESET_FILTERS', () => {
    const action = { type: actions.RESET_FILTERS };
    const expectedState = getDefaultFilters();

    const nextState = reducer({}, action)

    expect(nextState).toEqual(expectedState);
  });

  it('should handle RESET_FILTERS', () => {
    const action = { type: actions.RESET_FILTERS };
    const state = {
      hasPhoto: true,
      compatibilityScoreMin: 0.56
    }
    const expectedState = getDefaultFilters();

    const nextState = reducer(state, action)

    expect(nextState).toEqual(expectedState);
  });
});