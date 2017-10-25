import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.css';

const Main = (props, context) => (
  <div className={styles.Main}>
    <p>Matches</p>
    {
      context.matches !== undefined && context.matches.map(match => {
        return (
          <div>
            <div>
              <img src={match.main_photo} alt="profile pic"/>
            </div>
            <div>
              <p>{match.display_name}, {match.age}</p>
              <p>{match.job_title}</p>
              <p>{match.city.name}</p>
            </div>
          </div>
        );
      })
    }
  </div>
);

Main.contextTypes = {
  matches: PropTypes.object
};

export default Main;