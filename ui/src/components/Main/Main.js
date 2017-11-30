import React from 'react';
import styles from './Main.scss';

const Main = ({ children }) => (
  <div className={styles.MainWrapper}>
    <div className={styles.Main}>
      {children}
    </div>
  </div>
);

export default Main;