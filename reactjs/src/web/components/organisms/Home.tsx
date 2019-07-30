import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import DashBoard from '~/web/containers/DashBoardContainer';
import Challenges from '~/web/containers/ChallengesContainer';
import GeneralTopics from '../molecules/GeneralTopics';
import Challenge from '~/web/containers/ChallengeContainer';
import Layout from '../templates/DefaultLayout';
import Categories from '~/web/containers/CategoriesContainer';
import Category from '~/web/containers/CategoryContainer';
import Ranking from '../../containers/RankingContainer';
import Settings from '~/web/containers/SettingsContainer';
import Info from './Info';
import Announce from './Announce';

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
      <Route path="/info/announce" component={Announce} />
      <Route path="/info" component={Info} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
