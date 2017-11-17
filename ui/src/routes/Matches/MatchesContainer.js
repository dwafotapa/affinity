import { connect } from 'react-redux';
import Matches from './Matches';
import { fetchMatches } from './actions';
import { getIsFetching, getHasFetchFailed, getFilters, getMatches } from './selectors';

const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  hasFetchFailed: getHasFetchFailed(state),
  filters: getFilters(state),
  items: getMatches(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMatches: (filters) => {
    dispatch(fetchMatches(filters));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Matches);