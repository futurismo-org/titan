import * as React from 'react';
import { Route, Switch } from 'react-router-native';
import Category from '~/native/containers/CategoryContainer';
import Layout from '../templates/HeroLayout';

const Hero = () => (
  <Layout>
    <Switch>
      <Route path="/cat/:id" component={Category} />
    </Switch>
  </Layout>
);

export default Hero;
