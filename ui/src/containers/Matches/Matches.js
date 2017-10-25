import React from 'react';
import qs from 'qs';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import styles from './Matches.css';

const Matches = (props) => {
  return (
    <div className={styles.Matches}>
      <Sidebar/>
      <Main/>
    </div>
  );
};

export default Matches;