import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Match.scss';

const formatHeight = (height) => {
  return `${height}cm`;
}

const formatCompatibilityScore = (compatibilityScore) => {
  return `${compatibilityScore * 100}%`;
}

const Match = (props) => {
  const { match } = props;
  return (
    <div className={styles.Match}>
      <img src={match.main_photo} alt={match.main_photo} className={styles.MatchPhoto}/>
      <div className={styles.MatchDetails}>
        <div><b>{match.display_name}</b>, {match.age}</div>
        <div>{formatCompatibilityScore(match.compatibility_score)}</div>
        <div>{formatHeight(match.height_in_cm)}</div>
        <div>{match.city.name}</div>
        <div>{match.job_title}</div>
      </div>
    </div>
  );
}

Match.propTypes = {
  match: PropTypes.object.isRequired
};

export default Match;