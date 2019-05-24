import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../templates/AdminLayout";
import DashBoard from "./DashBoard";

const Admin = () => (
  <Layout>
    <Switch>
      <Route path="/admin" component={DashBoard} />
    </Switch>
  </Layout>
);

export default Admin;
