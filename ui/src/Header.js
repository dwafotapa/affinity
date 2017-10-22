import React from 'react';
import styles from './App.css';

const Header = () => (
  <div className={styles.header}>
    <ul className={styles.nav}>
      <li><a href={window.location.host}>Home</a></li>
      <li><a href={window.location.host}>Profile</a></li>
      <li><a href={window.location.host}>Messages</a></li>
      <li><a href={window.location.host}>Matches</a></li>
    </ul>
  </div>
);

export default Header;