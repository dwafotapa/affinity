import * as selectors from './selectors';

describe('Matches/selectors', () => {
  const expectedIsFetching = false;
  const expectedHasFetchFailed = false;
  const expectedMatches = [
    {
      fakeprop: 1
    },
    {
      fakeprop: 2
    }
  ];
  const expectedFilters = {
    hasPhoto: true,
    isFavourite: true
  };
  const state = {
    filters: expectedFilters,
    matches: {
      isFetching: expectedIsFetching,
      hasFetchFailed: expectedHasFetchFailed,
      items: expectedMatches
    }
  };

  it('should get the isFetching flag', () => {
    const isFetching = selectors.getIsFetching(state);

    expect(isFetching).toEqual(expectedIsFetching);
  });

  it('should get the hasFetchFailed flag', () => {
    const hasFetchFailed = selectors.getHasFetchFailed(state);

    expect(hasFetchFailed).toEqual(expectedHasFetchFailed);
  });

  it('should select the matches', () => {
    const matches = selectors.getMatches(state);

    expect(matches).toEqual(expectedMatches);
  });

  it('should select the filters', () => {
    const filters = selectors.getFilters(state);

    expect(filters).toEqual(expectedFilters);
  });
});