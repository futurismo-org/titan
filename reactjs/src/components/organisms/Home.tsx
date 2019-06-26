import { Route, Switch } from 'react-router-dom';

import * as React from 'react';
import Challenge from './Challenge';
import Challenges from './Challenges';
import DashBoard from './DashBoard';
import Layout from '../templates/DefaultLayout';
import Categories from './Categories';
import Category from './Category';
import Ranking from './Ranking';

import DemoBoard from '../molecules/DemoBoard';

import { withTracker } from '../utils/withtracker';

const Home = () => (
  <Layout>
    <DemoBoard />
    <Switch>
      <Route path="/challenges/:id" component={withTracker(Challenge)} />
      <Route path="/challenges" component={withTracker(Challenges)} />
      <Route path="/categories/:id" component={withTracker(Category)} />
      <Route path="/categories" component={withTracker(Categories)} />
      <Route path="/ranking" component={withTracker(Ranking)} />
      <Route path="/" component={withTracker(DashBoard)} />
    </Switch>
  </Layout>
);

export default Home;
