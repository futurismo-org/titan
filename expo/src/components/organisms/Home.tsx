import { Route, Switch } from 'react-router-native';

import * as React from 'react';
import DashBoard from './DashBoard';

const Home = () => <Route path="/" component={DashBoard} />;

export default Home;
