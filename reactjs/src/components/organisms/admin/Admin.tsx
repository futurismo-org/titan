import { Switch } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';
import AdminRoute from '../../utils/AdminRoute';

import ChallengeForm from './ChallengeForm';
import CategoryForm from './CategoryForm';
import DashBoard from './DashBoard';
import Layout from '../../templates/AdminLayout';

const AdminContainer = styled.div`
  margin: 30px;
`;

const Admin = () => (
  <Layout>
    <AdminContainer>
      <Switch>
        <AdminRoute
          path="/admin/challenges/new/:id"
          component={ChallengeForm}
        />
        <AdminRoute path="/admin/challenges/new" component={ChallengeForm} />
        <AdminRoute path="/admin/categories/new/:id" component={CategoryForm} />
        <AdminRoute path="/admin/categories/new" component={CategoryForm} />
        <AdminRoute path="/admin" component={DashBoard} />
      </Switch>
    </AdminContainer>
  </Layout>
);

export default Admin;
