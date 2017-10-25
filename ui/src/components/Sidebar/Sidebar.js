import React from 'react';
import styles from './Sidebar.css';

const Sidebar = () => (
  <div className={styles.SidebarWrapper}>
    <div className={styles.Sidebar}>
      <div className={styles.SidebarHeading}>Filters</div>
      <div className={styles.SidebarBody}>
        <form action="/matches" method="get">
          <div>
            <input type="checkbox" name="has-photo"/>
            <label for="has-photo">Has photo</label>
          </div>
          <div>          
            <input type="checkbox" name="has-exchanged"/>
            <label for="has-exchanged">In contact</label>
          </div>
          <div>
            <input type="checkbox" name="is-favourite"/>
            <label for="is-favourite">Favourite</label>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Sidebar;