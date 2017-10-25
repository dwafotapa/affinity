import React from 'react';
import styles from './Home.css';

const Home = () => {
  return (
    <div className={styles.HomeWrapper}>
      <div className={styles.Home}>
        <div className={styles.HomeHeading}>Home</div>
        <div className={styles.HomeBody}>
          <p>Welcome to Affinity!</p>
          <p>Go to your matches section to see all your matches and filter them.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;