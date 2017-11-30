import React from 'react';
import styles from './Heading.scss';

const Heading = ({ children }) => (
  <div className={styles.Heading}>
    {children}
  </div>
);

export default Heading;