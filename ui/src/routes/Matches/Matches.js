import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarContainer from '../../components/Sidebar/SidebarContainer';
import Main from '../../components/Main/Main';
import styles from './Matches.scss';

const formatHeight = (height) => {
  return `${height}cm`;
}

const formatCompatibilityScore = (compatibilityScore) => {
  return `${compatibilityScore * 100}%`;
}

export class Matches extends Component {
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
      <div key={index} className={styles.MatchWrapper}>
        <img src={match.main_photo} alt={match.main_photo} className={styles.MatchPhoto}/>
        <div className={styles.MatchDetails}>
          <div><b>{match.display_name}</b>, {match.age}</div>
          <div>{formatCompatibilityScore(match.compatibility_score)}</div>
          <div>{formatHeight(match.height_in_cm)}</div>
          <div>{match.city.name}</div>
          <div>{match.job_title}</div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.Matches}>
        <SidebarContainer/>
        <Main
          heading="Matches"
          body={this.renderMatches()}
        />
      </div>
    );
  }
};

Matches.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasFetchFailed: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fetchMatches: PropTypes.func.isRequired
};

export default Matches;