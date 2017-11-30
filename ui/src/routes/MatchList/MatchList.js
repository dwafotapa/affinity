import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarContainer from '../../components/Sidebar/SidebarContainer';
import Main from '../../components/Main/Main';
import Match from './Match/Match';
import styles from './MatchList.scss';

export class MatchList extends Component {
  componentDidMount() {
    this.props.fetchMatches();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters !== this.props.filters) {
      this.props.fetchMatches();
    }
  }

  renderMatches = () => {
    const { isFetching, hasFetchFailed, items } = this.props;
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (hasFetchFailed) {
      return <div>Failed to fetch data. Please reload the page.</div>;
    }

    if (items.length === 0) {
      return 'No matches found.';
    }

    return items.map((match, index) => (
      <Match
        key={index}
        match={match}
      />
    ));
  }

  render() {
    return (
      <div className={styles.MatchList}>
        <SidebarContainer/>
        <Main
          heading="Matches"
          body={this.renderMatches()}
        />
      </div>
    );
  }
};

MatchList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasFetchFailed: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fetchMatches: PropTypes.func.isRequired
};

export default MatchList;