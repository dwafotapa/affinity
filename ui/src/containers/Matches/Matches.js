import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import styles from './Matches.css';

const fetchMatches = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(response => resolve(response.json()));
  });
}

const formatUrl = (origin, filters) => {
  let queryString = '';
  for (const prop in filters) {
    queryString += `${prop}=${filters[prop]}&`
  }
  queryString = queryString.slice(0, -1);
  return `${origin}?${queryString}`;
}

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      filters: {
        compatibilityScoreMin: 0.01,
        compatibilityScoreMax: 0.99,
        ageMin: 18,
        ageMax: 95,
        heightMin: 135,
        heightMax: 210,
        distanceMin: 0,
        distanceMax: 30
      },
      entities: {
        matches: []
      },
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
  }

  componentDidUpdate() {
    const { isFetching, filters } = this.state;
    if (isFetching) {
      const url = formatUrl('http://localhost:5000/api/matches', filters);
      fetchMatches(url).then(json => {
        this.setState(prevState => ({
          isFetching: false,
          entities: {
            ...prevState.entities,
            matches: json.matches || []
          }
        }));
      });
    }
  }
  
  handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      this.setState(prevState => ({
        isFetching: true,
        filters: {
          ...prevState.filters,
          [name]: checked
        }
      }));
    } else {
      this.setState(prevState => {
        const filters = Object.assign({}, prevState.filters);
        delete filters[name];
        return {
          isFetching: true,
          filters
        }
      });
    }
  }

  // sets the new values of the filter
  handleInputRangeChange = (nameMin, nameMax, value) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [nameMin]: value.min,
        [nameMax]: value.max
      }
    }));
  }

  handleInputRangeChangeComplete = () => {
    this.setState({ isFetching: true });
  }

  handleInputRangeWithOpenBoundsChangeComplete = (name, boundValue) => {
    this.setState(prevState => {
      let filters = { ...prevState.filters };
      if (filters[name] === boundValue) {
        delete filters[name];
      }
      return {
        isFetching: true,
        filters
      };
    });
  }
  
  renderMatches = () => {
    const { isFetching } = this.state;
    const { matches } = this.state.entities;
    if (isFetching) {
      return <div>Loading...</div>;
    }

    if (matches.length === 0) {
      return 'No matches found.';
    }

    return matches.map((match, index) => (
      <div key={index} className={styles.MatchWrapper}>
        <img src={match.main_photo} alt={match.main_photo} className={styles.MatchPhoto}/>
        <div className={styles.MatchDetails}>
          <p>{match.display_name}, {match.age}</p>
          <p>{match.job_title}</p>
          <p>{match.city.name}</p>
          <p>{match.height_in_cm}</p>
          <p>{match.compatibility_score * 100}%</p>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className={styles.Matches}>
        <Sidebar
          filters={this.state.filters}
          handleCheckboxChange={this.handleCheckboxChange}
          handleInputRangeChange={this.handleInputRangeChange}
          handleInputRangeChangeComplete={this.handleInputRangeChangeComplete}
          handleInputRangeWithOpenBoundsChangeComplete={this.handleInputRangeWithOpenBoundsChangeComplete}
          handleInputRangeWithSingleSelectionChange={this.handleInputRangeWithSingleSelectionChange}
        />
        <Main
          heading="Matches"
          body={this.renderMatches()}
        />
      </div>
    );
  }
};

export default Matches;