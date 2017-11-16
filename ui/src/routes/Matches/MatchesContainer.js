import { connect } from 'react-redux';
import Matches from './Matches';
import { fetchMatches } from './actions';
import { getIsFetching, getFilters, getMatches } from './selectors';

const mapStateToProps = (state) => ({
  filters: getFilters(state),
  isFetching: getIsFetching(state),
  items: getMatches(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchMatches: (filters) => {
    dispatch(fetchMatches(filters));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Matches);