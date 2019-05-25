import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../templates/DefaultLayout";
import PlayGround from "./PlayGround";
import Singin from "./Signin";
import Challenges from "./Challenges";
import Challenge from "./Challenge";
import Category from "./Category";
import Categories from "./Categories";

const Home = () => <p>Home</p>;

const DashBoard = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/challenges" component={Challenges} />
      <Route path="/challenges/:id" component={Challenge} />
      <Route exact path="/categories" component={Categories} />
      <Route path="/categories/:id" component={Category} />
      <Route path="/signin" component={Singin} />
      <Route path="/playground" component={PlayGround} />
    </Switch>
  </Layout>
);
export default DashBoard;
