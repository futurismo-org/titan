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
        <AdminRoute path="/admin/cat/:id/edit" render={CategoryForm} />
        <AdminRoute path="/admin/cat/new" render={CategoryForm} />
        <AdminRoute path="/admin/c/:id/edit" render={ChallengeForm} />
        <AdminRoute path="/admin/c/new" render={ChallengeForm} />
        <AdminRoute path="/admin/documents/edit" render={DocumentForm} />
        <AdminRoute path="/admin" render={DashBoard} />
      </Switch>
    </AdminContainer>
  </Layout>
);

export default Admin;
