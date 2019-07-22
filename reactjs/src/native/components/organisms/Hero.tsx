import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import Category from '~/native/containers/CategoryContainer';
import Layout from '../templates/HeroLayout';

const Hero = () => (
  <Switch>
    <Layout>
      <Route path="/cat/:id" component={Category} />
    </Layout>
  </Switch>
);

export default Hero;
