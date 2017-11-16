import * as actions from './actions';

describe('Sidebar/actions', () => {
  it('should create a SET_FILTER action to add or update a filter', () => {
    const filter = 'hasPhoto';
    const value = true;
    const expectedAction = {
      type: actions.SET_FILTER,
      filter,
      value
    };

    expect(actions.setFilter(filter, value)).toEqual(expectedAction);
  });

  it('should create a REMOVE_FILTER action to remove a filter', () => {
    const filter = 'hasPhoto';
    const expectedAction = {
      type: actions.REMOVE_FILTER,
      filter
    };

    expect(actions.removeFilter(filter)).toEqual(expectedAction);
  });

  it('should create a RESET_FILTERS action to reset to default filters', () => {
    const expectedAction = {
      type: actions.RESET_FILTERS
    };

    expect(actions.resetFilters()).toEqual(expectedAction);
  });
})