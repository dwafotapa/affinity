import React from 'react';
import InputRange from 'react-input-range';
import styles from './Sidebar.css';
import 'react-input-range/lib/css/index.css';

const formatCompatibilityScoreLabel = (value) => {
  return value * 100;
};

const formatDistanceLabel = (value) => {
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
            <label>Compatibility Score</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={value => formatCompatibilityScoreLabel(value)}
                minValue={0.01}
                maxValue={0.99}
                onChange={value => props.handleInputRangeDoubleFilterChange(
                  'compatibilityScoreMin',
                  'compatibilityScoreMax',
                  value
                )}
                step={0.01}
                value={{
                  min: filters.compatibilityScoreMin || 0.01,
                  max: filters.compatibilityScoreMax || 0.99
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarFilter}>
            <label>Distance in km</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={value => formatDistanceLabel(value)}
                minValue={30}
                maxValue={300}
                onChange={value => props.handleInputRangeSingleFilterChange(
                  filters.distanceMin ? 'distanceMin' : 'distanceMax',
                  value === 300 ? 'distanceMin' : 'distanceMax',
                  value
                )}
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