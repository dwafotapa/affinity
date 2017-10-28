import React from 'react';
import InputRange from 'react-input-range';
import styles from './Sidebar.css';
import 'react-input-range/lib/css/index.css';

const formatLabel = (value, type) => {
  switch (value) {
    case 0:
      return value;
    case 330:
      return '> 300';
    default:
      return `< ${value}`;
  }
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
                formatLabel={formatLabel}
                minValue={0}
                maxValue={330}
                onChange={value => props.handleInputRangeFilterChange(
                  filters.distanceMin ? 'distanceMin' : (filters.distanceMax ? 'distanceMax' : ''),
                  value === 330 ? 'distanceMin' : 'distanceMax',
                  value)}
                step={30}
                value={filters.distanceMin || filters.distanceMax || 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;