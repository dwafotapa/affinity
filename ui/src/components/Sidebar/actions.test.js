import * as actions from './actions';

describe('actions', () => {
  it('should create a SET_FILTER action', () => {
    const filter = 'hasPhoto';
    const value = true;
    const expectedAction = {
      type: actions.SET_FILTER,
      filter,
      value
    };

    const action = actions.setFilter(filter, value);

    expect(action).toEqual(expectedAction);
  });

  it('should create a REMOVE_FILTER action', () => {
    const filter = 'hasPhoto';
    const expectedAction = {
      type: actions.REMOVE_FILTER,
      filter
    };

    const action = actions.removeFilter(filter);

    expect(action).toEqual(expectedAction);
  });

  it('should create a RESET_FILTERS action', () => {
    const expectedAction = {
      type: actions.RESET_FILTERS
    };

    const action = actions.resetFilters();

    expect(action).toEqual(expectedAction);
  });
});