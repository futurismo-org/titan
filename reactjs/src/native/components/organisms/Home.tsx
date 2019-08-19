import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import DashBoard from '~/native/containers/DashBoardContainer';
import Challenges from '~/native/containers/ChallengesContainer';
import Categories from '~/native/containers/CategoriesContainer';
import Users from '~/native/containers/UsersContainer';
import Settings from '~/native/containers/SettingsContainer';
import GeneralTopics from '~/native/components/molecules/GeneralTopics';
import ProfileCategory from '~/native/containers/ProfileCategoryContainer';
import AuthScreen from '../atoms/AuthScreen';
import Layout from '../templates/PaddingLayout';
import Info from './Info';
import Meigen from './Meigen';
import Document from './Document';
import Contact from './Contact';

const Home = () => (
  <Layout>
    <Switch>
      <Route path="/settings" component={Settings} />
      <Route path="/users" component={Users} />
      <Route path="/topics" component={GeneralTopics} />
      <Route path="/categories" component={Categories} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/login" component={AuthScreen} />
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
      <Route
        path="/about"
        render={props => <Document id="about" {...props} />}
      />
      <Route
        path="/u/:userShortId/cat/:categoryId"
        component={ProfileCategory}
      />
      <Route path="/" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Home;
