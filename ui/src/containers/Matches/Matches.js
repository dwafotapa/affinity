import React from 'react';
import qs from 'qs';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import styles from './Matches.css';

const Matches = (props) => {
  // const hasPhoto = qs.parse(props.location['has-photo']);

  // const hasPhoto = props.location['has-photo']; // could be '?foo=bar'
  // const hasPhotoParam = new URLSearchParams(search);
  // const foo = params.get('foo');

  return (
    <div className={styles.Matches}>
      <Sidebar/>
      <Main/>
    </div>
  );
};

export default Matches;