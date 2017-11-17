import * as selectors from './selectors';

describe('Matches/selectors', () => {
  const expectedIsFetching = false;
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
      items: expectedMatches
    }
  };

  it('should get the isFetching flag', () => {
    const isFetching = selectors.getIsFetching(state);

    expect(isFetching).toEqual(expectedIsFetching);
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