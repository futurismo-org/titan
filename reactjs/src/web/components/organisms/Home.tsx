import React from 'react';

import { Route, Switch } from 'react-router-dom';
import DashBoard from '~/web/containers/DashBoardContainer';
import Challenges from '~/web/containers/challenges/ChallengesContainer';
import GeneralTopics from '../molecules/GeneralTopics';
import Challenge from '~/web/containers/challenges/ChallengeContainer';
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
import ProfileCategory from '~/web/containers/ProfileCategoryContainer';

const Home = (props: any) => {
  return (
    <Layout>
      <Switch>
        <Route path="/cat/:id" render={props => <Category {...props} />} />
        <Route path="/categories" render={props => <Categories {...props} />} />
        <Route path="/c/:id" render={props => <Challenge {...props} />} />
        <Route path="/challenges" render={props => <Challenges {...props} />} />
        <Route path="/topics" render={props => <GeneralTopics {...props} />} />
        <Route
          path="/u/:userShortId/cat/:categoryId"
          render={props => <ProfileCategory {...props} />}
        />
        <Route path="/u/:id" render={props => <Profile {...props} />} />
        <Route path="/users" render={props => <Users {...props} />} />
        <Route path="/settings" render={props => <Settings {...props} />} />
        <Route
          path="/info/announce"
          render={props => <Announce {...props} />}
        />
        <Route path="/info" render={props => <Info {...props} />} />
        <Route path="/meigen" render={props => <Meigen {...props} />} />
        <Route path="/contact" render={props => <Contact {...props} />} />
        <Route
          path="/terms_of_use"
          render={props => <Document id="terms_of_use" {...props} />}
        />
        <Route
          path="/about"
          render={props => <Document id="about" {...props} />}
        />
        <Route
          path="/privacy_policy"
          render={props => <Document id="privacy_policy" {...props} />}
        />
        <Route
          path="/guidelines"
          render={props => <Document id="guidelines" {...props} />}
        />
        <Route path="/" render={props => <DashBoard {...props} />} />
      </Switch>
    </Layout>
  );
};

export default Home;
