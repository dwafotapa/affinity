import React from 'react';
import styles from './Sidebar.css';

const Sidebar = () => (
  <div className={styles.Sidebar}>
    <p>Filters</p>
    <form action="/matches" method="get">
      <p>
        <input type="checkbox"/> Has photo
      </p>
      <p>
        <input type="checkbox"/> In contact
      </p>
      <p>
        <input type="checkbox"/> Favourite
      </p>
    </form>
  </div>
);

export default Sidebar;