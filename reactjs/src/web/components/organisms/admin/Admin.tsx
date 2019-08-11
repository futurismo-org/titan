import { Switch } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';
import AdminRoute from '../../utils/AdminRoute';

import ChallengeForm from './ChallengeForm';
import CategoryForm from './CategoryForm';
import DocumentForm from './DocumentForm';
import DashBoard from './DashBoard';
import Layout from '../../templates/AdminLayout';

const AdminContainer = styled.div`
  margin: 30px;
`;

const Admin = () => (
  <Layout>
    <AdminContainer>
      <Switch>
        <AdminRoute path="/admin/cat/:id/edit" component={CategoryForm} />
        <AdminRoute path="/admin/cat/new" component={CategoryForm} />
        <AdminRoute path="/admin/c/:id/edit" component={ChallengeForm} />
        <AdminRoute path="/admin/c/new" component={ChallengeForm} />
        <AdminRoute path="/admin/documents/edit" component={DocumentForm} />
        <AdminRoute path="/admin" component={DashBoard} />
      </Switch>
    </AdminContainer>
  </Layout>
);

export default Admin;
