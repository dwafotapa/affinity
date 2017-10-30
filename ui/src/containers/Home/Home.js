import React from 'react';
import PropTypes from 'prop-types';
import Main from '../../components/Main/Main';
import styles from './Home.css';

const Home = () => {
  const body = (
    <div>
      <p>Welcome to Affinity!</p>
      <p>Go to your matches section to see all your matches and filter them.</p>
    </div>
  );
  return (
    <div className={styles.Home}>
      <Main
        heading="Home"
        body={body}
      />
    </div>
  );
}

export default Home;