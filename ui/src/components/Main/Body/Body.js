import React from 'react';
import styles from './Body.scss';

const Body = ({ children }) => (
  <div className={styles.Body}>
    {children}
  </div>
);

export default Body;