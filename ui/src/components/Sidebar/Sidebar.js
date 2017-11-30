import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import config from '../../config';
import styles from './Sidebar.scss';
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
      isCollapsed: false,
      filters: props.filters // local state for dragging and updating the sliders
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filters !== this.state.filters) {
      this.setState({ filters: nextProps.filters });
    }
  }

  handleToggleLinkClick = (e) => {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const { setFilter, removeFilter } = this.props;
    if (checked) {
      setFilter(name, checked);
    } else {
      removeFilter(name);
    }
  }

  // stores the new value of the InputRange handle in the component's state when dragging it
  handleInputRangeChange = (nameMin, nameMax, value) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [nameMin]: value.min,
        [nameMax]: value.max
      }
    }));
  }

  // dispatches a SET_FILTER action for the moved handle when releasing it
  dispatchSetFilter = (nameMin, nameMax) => {
    if (this.state.filters[nameMin] !== this.props.filters[nameMin]) {
      this.props.setFilter(nameMin, this.state.filters[nameMin]);
    } else if (this.state.filters[nameMax] !== this.props.filters[nameMax]) {
      this.props.setFilter(nameMax, this.state.filters[nameMax]);
    }
  }

  handleInputRangeChangeComplete = (nameMin, nameMax) => {
    this.dispatchSetFilter(nameMin, nameMax);
  }

  handleInputRangeWithNoUpperLimitChangeComplete = (nameMin, nameMax, maxValue) => {
    if (this.props.filters[nameMax] && this.state.filters[nameMax] === maxValue) {
      return this.props.removeFilter(nameMax);
    }

    this.dispatchSetFilter(nameMin, nameMax);
  }
  
  handleResetButtonClick = (e) => {
    e.preventDefault();
    this.props.resetFilters();
  }

  render() {
    const { filters } = this.state;
    return (
      <div className={styles.SidebarWrapper}>
        <form className={styles.Sidebar}>
          <div className={styles.SidebarHeading}>
            Filters
            <span className={styles.SidebarToggleLink} onClick={this.handleToggleLinkClick}>{this.state.isCollapsed ? 'More' : 'Less'}</span>
          </div>
          {!this.state.isCollapsed &&
            <div className={styles.SidebarBody}>
              <div className={styles.SidebarRow}>
                <input
                  id="hasPhoto"
                  name="hasPhoto"
                  type="checkbox"
                  checked={this.props.filters.hasPhoto || false}
                  onChange={this.handleCheckboxChange}
                />
                <span> </span>
                <label htmlFor="hasPhoto">Has photo</label>
              </div>
              <div className={styles.SidebarRow}>
                <input
                  id="hasExchanged"
                  name="hasExchanged"
                  type="checkbox"
                  checked={this.props.filters.hasExchanged || false}
                  onChange={this.handleCheckboxChange}
                />
                <span> </span>
                <label htmlFor="hasExchanged">In contact</label>
              </div>
              <div className={styles.SidebarRow}>
                <input
                  id="isFavourite"
                  name="isFavourite"
                  type="checkbox"
                  checked={this.props.filters.isFavourite || false}
                  onChange={this.handleCheckboxChange}
                />
                <span> </span>
                <label htmlFor="isFavourite">Favourite</label>
              </div>
              <div className={styles.SidebarRow}>
                <label>Compatibility Score</label>
                <div className={styles.SidebarInputRange}>
                  <InputRange
                    name="compatibilityScore"
                    formatLabel={value => formatCompatibilityScoreLabel(value)}
                    minValue={config.COMPATIBILITY_SCORE_MIN}
                    maxValue={config.COMPATIBILITY_SCORE_MAX}
                    onChange={value => this.handleInputRangeChange('compatibilityScoreMin', 'compatibilityScoreMax', value)}
                    onChangeComplete={value => this.handleInputRangeChangeComplete('compatibilityScoreMin', 'compatibilityScoreMax')}
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
                    name="age"
                    formatLabel={value => formatAgeLabel(value)}
                    minValue={config.AGE_MIN}
                    maxValue={config.AGE_MAX}
                    onChange={value => this.handleInputRangeChange('ageMin', 'ageMax', value)}
                    onChangeComplete={value => this.handleInputRangeWithNoUpperLimitChangeComplete('ageMin', 'ageMax', config.AGE_MAX)}
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
                    name="height"
                    formatLabel={value => formatHeightLabel(value)}
                    minValue={config.HEIGHT_MIN}
                    maxValue={config.HEIGHT_MAX}
                    onChange={value => this.handleInputRangeChange('heightMin', 'heightMax', value)}
                    onChangeComplete={value => this.handleInputRangeWithNoUpperLimitChangeComplete('heightMin', 'heightMax', config.HEIGHT_MAX)}
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
                    name="distance"
                    formatLabel={value => formatDistanceLabel(value)}
                    minValue={config.DISTANCE_MIN}
                    maxValue={config.DISTANCE_MAX}
                    onChange={value => this.handleInputRangeChange('distanceMin', 'distanceMax', { min: 0, max: value })}
                    onChangeComplete={value => this.handleInputRangeWithNoUpperLimitChangeComplete('distanceMin', 'distanceMax', config.DISTANCE_MAX)}
                    value={filters.distanceMax || config.DISTANCE_MAX}
                  />
                </div>
              </div>
              <div className={styles.SidebarRow}>
                <div className={styles.SidebarResetButton}>
                  <button onClick={this.handleResetButtonClick}>Reset</button>
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
  setFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired
};

export default Sidebar;