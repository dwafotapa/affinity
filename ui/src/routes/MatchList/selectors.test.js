import * as selectors from './selectors';

describe('selectors', () => {
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

  describe('getIsFetching()', () => {
    it('should return the isFetching flag', () => {
      const isFetching = selectors.getIsFetching(state);

      expect(isFetching).toEqual(expectedIsFetching);
    });
  });

  describe('getHasFetchFailed()', () => {
    it('should return the hasFetchFailed flag', () => {
      const hasFetchFailed = selectors.getHasFetchFailed(state);

      expect(hasFetchFailed).toEqual(expectedHasFetchFailed);
    });
  });

  describe('getMatches()', () => {    
    it('should return the matches', () => {
      const matches = selectors.getMatches(state);

      expect(matches).toEqual(expectedMatches);
    });
  });

  describe('getFilters()', () => {    
    it('should return the filters', () => {
      const filters = selectors.getFilters(state);

      expect(filters).toEqual(expectedFilters);
    });
  });
});