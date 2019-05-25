import { Route, Switch } from 'react-router-dom';

import React from 'react';
import Challenge from './Challenge';
import Challenges from './Challenges';
import DashBoard from './DashBoard';
import Layout from '../templates/DefaultLayout';
import Singin from './Signin';

const Home = props => (
  <Layout>
    <Switch>
      <Route path="/signin" component={Singin} />
      <Route path="/challenges/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
