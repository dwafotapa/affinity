import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { setFilter, removeFilter, resetFilters } from './actions';
import { getFilters } from './selectors';

const mapStateToProps = (state) => ({
  filters: getFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter, value) => {
    dispatch(setFilter(filter, value));
  },
  removeFilter: (filter) => {
    dispatch(removeFilter(filter));
  },
  resetFilters: () => {
    dispatch(resetFilters());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);