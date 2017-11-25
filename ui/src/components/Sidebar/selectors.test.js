import * as selectors from './selectors';

describe('selectors', () => {
  describe('getFilters()', () => {
    it('should return the filters', () => {
      const expectedFilters = {
        hasPhoto: true,
        isFavourite: true
      };
      const state = {
        filters: { ...expectedFilters }
      };

      const filters = selectors.getFilters(state);

      expect(filters).toEqual(expectedFilters);
    });
  });
});