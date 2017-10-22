import React, { Component } from 'react';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Nav />
        <div className={styles.AppContent}>
          <Sidebar />
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
