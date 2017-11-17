import * as selectors from './selectors';

describe('Sidebar/selectors', () => {
  it('should select the filters', () => {
    const state = {
      filters: {
        hasPhoto: true,
        isFavourite: true
      }
    };
    const expectedFilters = {
      hasPhoto: true,
      isFavourite: true
    };

    const filters = selectors.getFilters(state);

    expect(filters).toEqual(expectedFilters);
  });
});