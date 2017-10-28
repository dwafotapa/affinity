import React from 'react';
import InputRange from 'react-input-range';
import styles from './Sidebar.css';
import 'react-input-range/lib/css/index.css';

const formatDistanceLabel = (value, type) => {
  const operator = value === 300 ? '>' : '<';
  return `${operator} ${value}`;
};

const Sidebar = (props) => {
  const { filters } = props;
  return (
    <div className={styles.SidebarWrapper}>
      <div className={styles.Sidebar}>
        <div className={styles.SidebarHeading}>Filters</div>
        <div className={styles.SidebarBody}>
          <div className={styles.SidebarFilter}>
            <input
              name="hasPhoto"
              type="checkbox"
              checked={filters.hasPhoto || false}
              onChange={props.handleCheckboxFilterChange}
            /> <label htmlFor="hasPhoto">Has photo</label>
          </div>
          <div className={styles.SidebarFilter}>
            <input
              name="hasExchanged"
              type="checkbox"
              checked={filters.hasExchanged || false}
              onChange={props.handleCheckboxFilterChange}
            /> <label htmlFor="hasExchanged">In contact</label>
          </div>
          <div className={styles.SidebarFilter}>
            <input
              name="isFavourite"
              type="checkbox"
              checked={filters.isFavourite || false}
              onChange={props.handleCheckboxFilterChange}
            /> <label htmlFor="isFavourite">Favourite</label>
          </div>
          <div className={styles.SidebarFilter}>
            <label>Distance in km</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={formatDistanceLabel}
                minValue={30}
                maxValue={300}
                onChange={value => props.handleInputRangeFilterChange(
                  filters.distanceMin ? 'distanceMin' : 'distanceMax',
                  value === 300 ? 'distanceMin' : 'distanceMax',
                  value)}
                value={filters.distanceMin || filters.distanceMax || 30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;