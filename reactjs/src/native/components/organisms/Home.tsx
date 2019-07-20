import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import DashBoard from '~/native/containers/DashBoardContainer';
import Challenges from '~/native/containers/ChallengesContainer';
import Categories from '~/native/containers/CategoriesContainer';
import Layout from '../templates/DefaultLayout';

const Home = () => (
  <Layout>
    <Switch>
      {/* <Route path="/cat/:id" component={Category} />
      <Route path="/c/:id" component={Challenge} />      
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/settings" component={Settings} /> */}
      <Route path="/categories" component={Categories} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
