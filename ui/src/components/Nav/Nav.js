import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.css';

const Nav = () => (
  <div className={styles.Nav}>
    <ul className={styles.NavContent}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/messages">Messages</Link></li>
      <li><Link to="/matches">Matches</Link></li>
    </ul>
  </div>
);

export default Nav;