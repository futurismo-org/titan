import * as React from 'react';
import { Route } from 'react-router-native';
import DashBoard from '~/native/containers/DashBoardContainer';

const Home = () => <Route path="/" component={DashBoard} />;

export default Home;
