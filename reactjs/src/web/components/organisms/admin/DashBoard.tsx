import * as React from 'react';
import Challenges from './Challenges';
import Categories from './Categories';
import Documents from './Documents';

const DashBoard = () => (
  <React.Fragment>
    <h1>管理画面</h1>
    <p>削除はFirebaseの管理画面からする。</p>
    <Documents />
    <Categories />
    <Challenges />
  </React.Fragment>
);

export default DashBoard;
