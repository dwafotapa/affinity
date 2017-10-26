import React from 'react';
import styles from './Main.css';

const Main = (props) => (
  <div className={styles.MainWrapper}>
    <div className={styles.Main}>
      <div className={styles.MainHeading}>{props.heading}</div>
      <div className={styles.MainBody}>{props.body}</div>
    </div>
  </div>
);

export default Main;