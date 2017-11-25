import { connect } from 'react-redux';
import MatchList from './MatchList';
import { fetchMatches } from './actions';
import {
  getIsFetching,
  getHasFetchFailed,
  getFilters,
  getMatches
} from './selectors';

const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  hasFetchFailed: getHasFetchFailed(state),
  filters: getFilters(state),
  items: getMatches(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMatches: () => {
    dispatch(fetchMatches());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchList);