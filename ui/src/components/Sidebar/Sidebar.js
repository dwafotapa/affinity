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
      <form className={styles.Sidebar}>
        <div className={styles.SidebarHeading}>Filters</div>
        <div className={styles.SidebarBody}>
          <div className={styles.SidebarRow}>
            <input
              id="hasPhoto"
              name="hasPhoto"
              type="checkbox"
              checked={filters.hasPhoto || false}
              onChange={props.handleCheckboxChange}
            />
            <span> </span>
            <label htmlFor="hasPhoto">Has photo</label>
          </div>
          <div className={styles.SidebarRow}>
            <input
              id="hasExchanged"
              name="hasExchanged"
              type="checkbox"
              checked={filters.hasExchanged || false}
              onChange={props.handleCheckboxChange}
            />
            <span> </span>
            <label htmlFor="hasExchanged">In contact</label>
          </div>
          <div className={styles.SidebarRow}>
            <input
              id="isFavourite"
              name="isFavourite"
              type="checkbox"
              checked={filters.isFavourite || false}
              onChange={props.handleCheckboxChange}
            />
            <span> </span>
            <label htmlFor="isFavourite">Favourite</label>
          </div>
          <div className={styles.SidebarRow}>
            <label>Compatibility Score</label>
            <div className={styles.SidebarInputRange}>
              <InputRange
                formatLabel={value => formatCompatibilityScoreLabel(value)}
                minValue={0.01}
                maxValue={0.99}
                onChange={value => props.handleInputRangeChange('compatibilityScoreMin', 'compatibilityScoreMax', value)}
                onChangeComplete={value => props.handleInputRangeChangeComplete()}
                step={0.01}
                value={{
                  min: filters.compatibilityScoreMin || 0.01,
                  max: filters.compatibilityScoreMax || 0.99
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarRow}>
            <label>Age</label>
            <div className={styles.SidebarInputRange}>
              <InputRange
                formatLabel={value => formatAgeLabel(value)}
                minValue={18}
                maxValue={95}
                onChange={value => props.handleInputRangeChange('ageMin', 'ageMax', value)}
                onChangeComplete={value => props.handleInputRangeWithOpenBoundsChangeComplete('ageMax', 95)}
                value={{
                  min: filters.ageMin || 18,
                  max: filters.ageMax || 95
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarRow}>
            <label>Height</label>
            <div className={styles.SidebarInputRange}>
              <InputRange
                formatLabel={value => formatHeightLabel(value)}
                minValue={135}
                maxValue={210}
                onChange={value => props.handleInputRangeChange('heightMin', 'heightMax', value)}
                onChangeComplete={value => props.handleInputRangeWithOpenBoundsChangeComplete('heightMax', 210)}                
                value={{
                  min: filters.heightMin || 135,
                  max: filters.heightMax || 210
                }}
              />
            </div>
          </div>
          <div className={styles.SidebarRow}>
            <label>Distance in km</label>
            <div className={styles.SidebarInputRange}>
              <InputRange
                formatLabel={value => formatDistanceLabel(value)}
                minValue={30}
                maxValue={300}
                onChange={value => props.handleInputRangeChange('distanceMin', 'distanceMax', { min: 0, max: value })}
                onChangeComplete={value => props.handleInputRangeWithOpenBoundsChangeComplete('distanceMax', 300)}
                value={filters.distanceMax || 300}
              />
            </div>
          </div>
          <div className={styles.SidebarRow}>
            <div className={styles.SidebarResetButton}>
              <button onClick={props.handleResetButtonClick}>Reset</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;