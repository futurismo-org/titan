import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../templates/DefaultLayout';
import DashBoard from './DashBoard';

import PlayGround from './PlayGround';
import Singin from './Signin';
import Challenges from './Challenges';
import Challenge from './Challenge';

const Home = props => (
  <Layout>
    <Switch>
      <Route path="/signin" component={Singin} />
      <Route path="/playground" component={PlayGround} />
      <Route path="/challenges/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
