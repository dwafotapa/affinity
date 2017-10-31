import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import config from '../../config';
import styles from './Sidebar.css';
import 'react-input-range/lib/css/index.css';

const formatCompatibilityScoreLabel = (value) => {
  return Math.round(value * 100);
};

const formatAgeLabel = (value) => {
  const operator = value >= config.AGE_MAX ? '> ' : '';
  return `${operator}${value}`;
};

const formatHeightLabel = (value) => {
  const operator = value >= config.HEIGHT_MAX ? '> ' : '';
  return `${operator}${value}`;
};

const formatDistanceLabel = (value) => {
  const operator = value === config.DISTANCE_MAX ? '>' : '<';
  return `${operator} ${value}`;
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true
    };
  }

  handleToggleLinkClick = (e) => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }

  render() {
    const { filters } = this.props;
    const toggleLinkText = this.state.isExpanded ? 'Less' : 'More';
    return (
      <div className={styles.SidebarWrapper}>
        <form className={styles.Sidebar}>
          <div className={styles.SidebarHeading}>
            Filters
            <span className={styles.SidebarToggleLink} onClick={this.handleToggleLinkClick}>{toggleLinkText}</span>
          </div>
          {this.state.isExpanded &&
            <div className={styles.SidebarBody}>
              <div className={styles.SidebarRow}>
                <input
                  id="hasPhoto"
                  name="hasPhoto"
                  type="checkbox"
                  checked={filters.hasPhoto || false}
                  onChange={this.props.handleCheckboxChange}
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
                  onChange={this.props.handleCheckboxChange}
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
                  onChange={this.props.handleCheckboxChange}
                />
                <span> </span>
                <label htmlFor="isFavourite">Favourite</label>
              </div>
              <div className={styles.SidebarRow}>
                <label>Compatibility Score</label>
                <div className={styles.SidebarInputRange}>
                  <InputRange
                    formatLabel={value => formatCompatibilityScoreLabel(value)}
                    minValue={config.COMPATIBILITY_SCORE_MIN}
                    maxValue={config.COMPATIBILITY_SCORE_MAX}
                    onChange={value => this.props.handleInputRangeChange('compatibilityScoreMin', 'compatibilityScoreMax', value)}
                    onChangeComplete={value => this.props.handleInputRangeChangeComplete()}
                    step={0.01}
                    value={{
                      min: filters.compatibilityScoreMin || config.COMPATIBILITY_SCORE_MIN,
                      max: filters.compatibilityScoreMax || config.COMPATIBILITY_SCORE_MAX
                    }}
                  />
                </div>
              </div>
              <div className={styles.SidebarRow}>
                <label>Age</label>
                <div className={styles.SidebarInputRange}>
                  <InputRange
                    formatLabel={value => formatAgeLabel(value)}
                    minValue={config.AGE_MIN}
                    maxValue={config.AGE_MAX}
                    onChange={value => this.props.handleInputRangeChange('ageMin', 'ageMax', value)}
                    onChangeComplete={value => this.props.handleInputRangeWithOpenBoundsChangeComplete('ageMax', config.AGE_MAX)}
                    value={{
                      min: filters.ageMin || config.AGE_MIN,
                      max: filters.ageMax || config.AGE_MAX
                    }}
                  />
                </div>
              </div>
              <div className={styles.SidebarRow}>
                <label>Height (in cm)</label>
                <div className={styles.SidebarInputRange}>
                  <InputRange
                    formatLabel={value => formatHeightLabel(value)}
                    minValue={config.HEIGHT_MIN}
                    maxValue={config.HEIGHT_MAX}
                    onChange={value => this.props.handleInputRangeChange('heightMin', 'heightMax', value)}
                    onChangeComplete={value => this.props.handleInputRangeWithOpenBoundsChangeComplete('heightMax', config.HEIGHT_MAX)}
                    value={{
                      min: filters.heightMin || config.HEIGHT_MIN,
                      max: filters.heightMax || config.HEIGHT_MAX
                    }}
                  />
                </div>
              </div>
              <div className={styles.SidebarRow}>
                <label>Distance (in km)</label>
                <div className={styles.SidebarInputRange}>
                  <InputRange
                    formatLabel={value => formatDistanceLabel(value)}
                    minValue={config.DISTANCE_MIN}
                    maxValue={config.DISTANCE_MAX}
                    onChange={value => this.props.handleInputRangeChange('distanceMin', 'distanceMax', { min: 0, max: value })}
                    onChangeComplete={value => this.props.handleInputRangeWithOpenBoundsChangeComplete('distanceMax', config.DISTANCE_MAX)}
                    value={filters.distanceMax || config.DISTANCE_MAX}
                  />
                </div>
              </div>
              <div className={styles.SidebarRow}>
                <div className={styles.SidebarResetButton}>
                  <button onClick={this.props.handleResetButtonClick}>Reset</button>
                </div>
              </div>
            </div>
          }
        </form>
      </div>
    );
  }
};

Sidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleInputRangeChange: PropTypes.func.isRequired,
  handleInputRangeChangeComplete: PropTypes.func.isRequired,
  handleInputRangeWithOpenBoundsChangeComplete: PropTypes.func.isRequired,
  handleResetButtonClick: PropTypes.func.isRequired
};

export default Sidebar;