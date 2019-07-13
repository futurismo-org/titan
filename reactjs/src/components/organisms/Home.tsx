import { Route, Switch } from 'react-router-dom';

import * as React from 'react';
import GeneralTopics from '../molecules/GeneralTopics';
import Challenge from './Challenge';
import Challenges from './Challenges';
import DashBoard from './DashBoard';
import Layout from '../templates/DefaultLayout';
import Categories from './Categories';
import Category from './Category';
import Ranking from './Ranking';

const Home = () => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" component={Category} />
      <Route path="/categories" component={Categories} />
      <Route path="/c/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
