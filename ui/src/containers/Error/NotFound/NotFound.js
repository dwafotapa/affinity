import React from 'react';
import styles from './NotFound.css';

const NotFoundPage = () => (
  <div className={styles.NotFound}>
    <h1>Oops!</h1>
    <div>Looks like you're lost...</div>
    <div className={styles.NotFoundLink}>
      <a href="/">Get me out of here!</a>
    </div>
  </div>
);

export default NotFoundPage;