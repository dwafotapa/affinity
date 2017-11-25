import deepFreeze from 'deep-freeze';
import reducer, { getDefaultFilters } from './reducer';
import * as actions from './actions';

describe('Sidebar/reducers', () => {
  const initialState = getDefaultFilters();
  deepFreeze(initialState);

  it('should return the initial state by default', () => {
    const expectedState = { ...initialState };

    const nextState = reducer(initialState, { type: 'DEFAULT'});

    expect(nextState).toEqual(expectedState);
  });

  it('should handle SET_FILTER to add a new filter', () => {
    const action = {
      type: actions.SET_FILTER,
      filter: 'hasPhoto',
      value: true
    };
    const expectedState = {
      ...initialState,
      hasPhoto: true
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should handle SET_FILTER to edit a filter', () => {
    const action = {
      type: actions.SET_FILTER,
      filter: 'compatibilityScoreMin',
      value: 0.50
    };
    const expectedState = {
      ...initialState,
      compatibilityScoreMin: 0.5
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should handle REMOVE_FILTER with a non-existing filter', () => {
    const action = {
      type: actions.REMOVE_FILTER,
      filter: 'nonExistingFilter'
    };
    const expectedState = { ... initialState };
    
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should handle REMOVE_FILTER with an existing filter', () => {
    const action = {
      type: actions.REMOVE_FILTER,
      filter: 'compatibilityScoreMin'
    };
    const { compatibilityScoreMin, ...expectedState } = initialState;

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should handle RESET_FILTERS', () => {
    const action = { type: actions.RESET_FILTERS };
    const expectedState = { ... initialState };

    const nextState = reducer(initialState, action)

    expect(nextState).toEqual(expectedState);
  });
});