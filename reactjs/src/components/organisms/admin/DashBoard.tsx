import * as React from 'react';
import Challenges from './Challenges';
import Categories from './Categories';

const DashBoard = () => (
  <React.Fragment>
    <Categories />
    <Challenges />
  </React.Fragment>
);

export default DashBoard;
