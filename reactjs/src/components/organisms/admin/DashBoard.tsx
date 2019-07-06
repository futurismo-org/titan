import * as React from 'react';
import Challenges from './Challenges';
import Categories from './Categories';

const DashBoard = () => (
  <React.Fragment>
    <h1>管理画面</h1>
    <p>削除はFirebaseの管理画面からする。</p>
    <Categories />
    <Challenges />
  </React.Fragment>
);

export default DashBoard;
