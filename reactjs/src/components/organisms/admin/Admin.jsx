import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../templates/AdminLayout";

const Home = () => <div>test</div>;

const Admin = () => (
  <Layout>
    <Switch>
      <Route path="/admin" component={Home} />
    </Switch>
  </Layout>
);

export default Admin;
