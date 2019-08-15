import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import Category from '~/native/containers/CategoryContainer';
import Challenge from '~/native/containers/ChallengeContainer';
import Profile from '~/native/containers/ProfileContainer';
import Layout from '../templates/HeroLayout';

const Hero = () => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" component={Category} />
      <Route path="/c/:id" component={Challenge} />
      <Route path="/u/:id" component={Profile} />
    </Switch>
  </Layout>
);

export default Hero;
