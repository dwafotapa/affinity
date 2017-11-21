import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './routes/Home/Home';
import MatchListContainer from './routes/MatchList/MatchListContainer';
import NotFound from './routes/Error/NotFound/NotFound';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/matches" component={MatchListContainer}/>
        <Route component={NotFound}/>
      </Switch>
    </Layout>
  </Router>
);

export default App;