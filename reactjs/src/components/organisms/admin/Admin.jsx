import { Route, Switch } from "react-router-dom";

import React from "react";
import ChallengeForm from "./ChallengeForm";
import DashBoard from "./DashBoard";
import Layout from "../../templates/AdminLayout";

const Admin = () => (
  <Layout>
    <Switch>
      <Route path="/admin/challenges/new/:id" component={ChallengeForm} />
      <Route path="/admin/challenges/new" component={ChallengeForm} />
      <Route path="/admin" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Admin;
