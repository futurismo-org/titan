import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../templates/DefaultLayout";
import PlayGround from "./PlayGround";
import Singin from "./Signin";

const Home = () => <p>Home</p>;
const Challenges = () => <p>Challenges</p>;

const DashBoard = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/signin" component={Singin} />
      <Route path="/playground" component={PlayGround} />
    </Switch>
  </Layout>
);
export default DashBoard;
