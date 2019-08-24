import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import Category from '~/native/containers/CategoryContainer';
import Challenge from '~/native/containers/challenges/ChallengeContainer';
import Profile from '~/native/containers/ProfileContainer';
import Layout from '../templates/HeroLayout';

const Hero = (props: any) => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" render={props => <Category {...props} />} />
      <Route path="/c/:id" render={props => <Challenge {...props} />} />
      <Route path="/u/:id" render={props => <Profile {...props} />} />
    </Switch>
  </Layout>
);

export default Hero;
