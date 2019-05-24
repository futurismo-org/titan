import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../templates/AdminLayout";
import DashBoard from "./DashBoard";
import ChallengeForm from "./ChallengeForm";

const Admin = () => (
  <Layout>
    <Switch>
      <Route path="/admin/challenges/new" component={ChallengeForm} />
      <Route path="/admin" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Admin;
