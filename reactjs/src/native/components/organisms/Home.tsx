import React from 'react';
import { Route, Switch } from 'react-router-native';
import DashBoard from '~/native/containers/DashBoardContainer';
import Challenges from '~/native/containers/challenges/ChallengesContainer';
import Categories from '~/native/containers/CategoriesContainer';
import Users from '~/native/containers/UsersContainer';
import Settings from '~/native/containers/SettingsContainer';
import GeneralTopics from '~/native/components/molecules/GeneralTopics';
import ProfileCategory from '~/native/containers/ProfileCategoryContainer';
import AuthScreen from '../atoms/Auth';
import Layout from '../templates/PaddingLayout';
import Info from './Info';
import Meigen from './Meigen';
import Document from './Document';
import Contact from './Contact';

const Home = (props: any) => {
  return (
    <Layout>
      <Switch>
        <Route path="/settings" render={props => <Settings {...props} />} />
        <Route path="/users" render={props => <Users {...props} />} />
        <Route path="/topics" render={props => <GeneralTopics {...props} />} />
        <Route path="/categories" render={props => <Categories {...props} />} />
        <Route path="/challenges" render={props => <Challenges {...props} />} />
        <Route path="/login" render={props => <AuthScreen {...props} />} />
        <Route path="/info" render={props => <Info {...props} />} />
        <Route path="/meigen" render={props => <Meigen {...props} />} />
        <Route path="/contact" render={props => <Contact {...props} />} />
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
          render={props => <ProfileCategory {...props} />}
        />
        <Route path="/" render={props => <DashBoard {...props} />} />
      </Switch>
    </Layout>
  );
};

export default Home;
