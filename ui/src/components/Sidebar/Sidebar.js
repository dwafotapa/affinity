import React from 'react';
import InputRange from 'react-input-range';
import styles from './Sidebar.css';
import 'react-input-range/lib/css/index.css';

const formatCompatibilityScoreLabel = (value) => {
  return Math.round(value * 100);
};

const formatAgeLabel = (value) => {
  const operator = value >= 95 ? '> ' : '';
  return `${operator}${value}`;
};

const formatHeightLabel = (value) => {
  const operator = value >= 210 ? '> ' : '';
  return `${operator}${value}`;
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
            />
            <span> </span>
            <label htmlFor="hasPhoto">Has photo</label>
          </div>
          <div className={styles.SidebarFilter}>
            <input
              name="hasExchanged"
              type="checkbox"
              checked={filters.hasExchanged || false}
              onChange={props.handleCheckboxFilterChange}
            />
            <span> </span>
            <label htmlFor="hasExchanged">In contact</label>
          </div>
          <div className={styles.SidebarFilter}>
            <input
              name="isFavourite"
              type="checkbox"
              checked={filters.isFavourite || false}
              onChange={props.handleCheckboxFilterChange}
            />
            <span> </span>
            <label htmlFor="isFavourite">Favourite</label>
          </div>
          <div className={styles.SidebarFilter}>
            <label>Compatibility Score</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={value => formatCompatibilityScoreLabel(value)}
                minValue={0.01}
                maxValue={0.99}
                onChange={value => props.handleInputRangeFilterChange(
                  'compatibilityScoreMin',
                  'compatibilityScoreMax',
                  value
                )}
                step={0.01}
                value={{
                  min: filters.compatibilityScoreMin,
                  max: filters.compatibilityScoreMax
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarFilter}>
            <label>Age</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={value => formatAgeLabel(value)}
                minValue={18}
                maxValue={95}
                onChange={value => props.handleInputRangeFilterChange(
                  'ageMin',
                  'ageMax',
                  value
                )}
                value={{
                  min: filters.ageMin || 18,
                  max: filters.ageMax || 95
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarFilter}>
            <label>Height</label>
            <div className={styles.InputRange}>
              <InputRange
                formatLabel={value => formatHeightLabel(value)}
                minValue={135}
                maxValue={210}
                onChange={value => props.handleInputRangeFilterChange(
                  'heightMin',
                  'heightMax',
                  value
                )}
                value={{
                  min: filters.heightMin || 135,
                  max: filters.heightMax || 210
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
                onChange={value => props.handleInputRangeFilterWithSingleHandleChange(
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