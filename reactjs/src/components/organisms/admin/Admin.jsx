import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../templates/AdminLayout";

const Home = () => <div>test</div>;

const Admin = () => (
  <Layout>
    <Route path="/admin" component={Home} />
  </Layout>
);

export default Admin;
