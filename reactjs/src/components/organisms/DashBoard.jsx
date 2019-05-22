import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../templates/DefaultLayout";

const Home = () => <p>Home</p>;
const Signin = () => <p>Singin</p>;
const Challenges = () => <p>Challenges</p>;

const DashBoard = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Signin} />
      <Route path="/challenges" component={Challenges} />
    </Switch>
  </Layout>
);
export default DashBoard;
