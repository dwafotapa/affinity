import React from 'react';
import styles from './Nav.css';

const Nav = () => (
  <div className={styles.Nav}>
    <ul className={styles.NavContent}>
      <li><a href={window.location.host}>Home</a></li>
      <li><a href={window.location.host}>Profile</a></li>
      <li><a href={window.location.host}>Messages</a></li>
      <li><a href={window.location.host}>Matches</a></li>
    </ul>
  </div>
);

export default Nav;