import * as React from 'react';

import { Route, Switch } from 'react-router-dom';
import DashBoard from '~/web/containers/DashBoardContainer';
import Challenges from '~/web/containers/ChallengesContainer';
import GeneralTopics from '../molecules/GeneralTopics';
import Challenge from '~/web/containers/ChallengeContainer';
import Layout from '../templates/DefaultLayout';
import Categories from '~/web/containers/CategoriesContainer';
import Category from '~/web/containers/CategoryContainer';
import Users from '../../containers/UsersContainer';
import Settings from '~/web/containers/SettingsContainer';
import Profile from '~/web/containers/ProfileContainer';
import Info from './Info';
import Announce from './Announce';
import Meigen from './Meigen';
import Document from './Document';
import Contact from './Contact';

const Home = () => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" component={Category} />
      <Route path="/categories" component={Categories} />
      <Route path="/c/:id" component={Challenge} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/u/:id" component={Profile} />
      <Route path="/users" component={Users} />
      <Route path="/settings" component={Settings} />
      <Route path="/info/announce" component={Announce} />
      <Route path="/info" component={Info} />
      <Route path="/meigen" component={Meigen} />
      <Route path="/contact" component={Contact} />
      <Route
        path="/terms_of_use"
        render={props => <Document id="terms_of_use" {...props} />}
      />
      <Route
        path="/privacy_policy"
        render={props => <Document id="privacy_policy" {...props} />}
      />
      <Route
        path="/guidelines"
        render={props => <Document id="guidelines" {...props} />}
      />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
