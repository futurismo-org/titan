import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import DashBoard from '~/native/containers/DashBoardContainer';
import Challenges from '~/native/containers/ChallengesContainer';
import Categories from '~/native/containers/CategoriesContainer';
import Ranking from '~/native/containers/RankingContainer';
import Settings from '~/native/containers/SettingsContainer';
import Profile from '~/native/containers/ProfileContainer';
import GeneralTopics from '~/native/components/molecules/GeneralTopics';
import AuthScreen from '../atoms/AuthScreen';
import Layout from '../templates/PaddingLayout';
import Info from './Info';

const Home = () => (
  <Layout>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/u/:id" component={Profile} />
      <Route path="/users" component={Ranking} />
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/categories" component={Categories} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/login" component={AuthScreen} />
      <Route path="/info" component={Info} />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
