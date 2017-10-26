import React from 'react';
import styles from './Sidebar.css';

const Sidebar = (props) => (
  <div className={styles.SidebarWrapper}>
    <div className={styles.Sidebar}>
      <div className={styles.SidebarHeading}>Filters</div>
      <div className={styles.SidebarBody}>
        <form>
          <div>
            <input
              name="hasPhoto"
              type="checkbox"
              checked={props.filters.hasPhoto}
              onChange={props.handleCheckboxFilterChange}
            />
            <label htmlFor="hasPhoto">Has photo</label>
          </div>
          <div>          
            <input
              name="hasExchanged"
              type="checkbox"
              checked={props.filters.hasExchanged}
              onChange={props.handleCheckboxFilterChange}
            />
            <label htmlFor="hasExchanged">In contact</label>
          </div>
          <div>
            <input
              name="isFavourite"
              type="checkbox"
              checked={props.filters.isFavourite}
              onChange={props.handleCheckboxFilterChange}
            />
            <label htmlFor="isFavourite">Favourite</label>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Sidebar;