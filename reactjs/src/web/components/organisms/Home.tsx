import { Route, Switch } from 'react-router-dom';

import * as React from 'react';
import DashBoard from 'web/containers/DashBoardContainer';
import GeneralTopics from '../molecules/GeneralTopics';
import Challenge from './Challenge';
import Challenges from './Challenges';
import Layout from '../templates/DefaultLayout';
import Categories from './Categories';
import Category from './Category';
import Ranking from './Ranking';
import Settings from './Settings';

const Home = () => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" component={Category} />
      <Route path="/categories" component={Categories} />
      <Route path="/c/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
