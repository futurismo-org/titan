import { Route, Switch } from 'react-router-native';

import * as React from 'react';
import DashBoard from './DashBoard';
// import Challenge from './Challenge';
// import Challenges from './Challenges';
// import Categories from './Categories';
// import Category from './Category';
// import Layout from '../templates/DefaultLayout';

const Home = () => <Route path="/" component={DashBoard} />;

export default Home;
