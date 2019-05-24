import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../templates/DefaultLayout";
import PlayGround from "./PlayGround";
import Singin from "./Signin";
import Challenges from "./Challenges";
import Challenge from "./Challenge";

const Home = () => <p>Home</p>;

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/challenges" component={Challenges} />
      <Route path="/challenges/:id" component={Challenge} />
      <Route path="/signin" component={Singin} />
      <Route path="/playground" component={PlayGround} />
    </Switch>
  </Layout>
);
export default App;
