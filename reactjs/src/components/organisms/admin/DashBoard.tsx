import * as React from 'react';
import Challenges from './Challenges';
import Categories from './Categories';

const DashBoard = () => (
  <React.Fragment>
    <h1>管理画面</h1>
    <Categories />
    <Challenges />
  </React.Fragment>
);

export default DashBoard;
