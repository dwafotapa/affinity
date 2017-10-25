import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Nav from './components/Nav';
import Home from './containers/Home';
import Matches from './containers/Matches';
import logo from './logo.svg';
import styles from './App.css';

const fetchMatches = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/api/matches').then(response => resolve(response.json()));
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: {
        matches: []
      }
    };
  }

  getChildContext() {
    return {
      matches: this.state.entities.matches
    };
  }

  componentDidMount() {
    fetchMatches().then(json => {
      this.setState({
        entities: {
          matches: json.matches
        }
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/matches" component={Matches}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

App.childContextTypes = {
  matches: PropTypes.object
};

export default App;
