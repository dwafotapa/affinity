import React from 'react';
import Main from '../../components/Main/Main';
import Heading from '../../components/Main/Heading/Heading';
import Body from '../../components/Main/Body/Body';
import styles from './Home.scss';

const Home = () => (
  <div className={styles.Home}>
    <Main>
      <Heading>Home</Heading>
      <Body>
        <div>
          <p>Welcome to Affinity!</p>
          <p>Go to your matches section to see all your matches and filter them.</p>
        </div>
      </Body>
    </Main>
  </div>
);

export default Home;