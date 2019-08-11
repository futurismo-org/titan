import React from 'react';
import { Button } from '@material-ui/core';
import NoStyledLink from '../../atoms/NoStyledLink';

const Documents = () => (
  <React.Fragment>
    <h2>ドキュメント関連</h2>
    <NoStyledLink to="/admin/documents/edit">
      <ul>
        <li>利用規約</li>
        <li>プライバシーポリシー</li>
        <li>コミュニティガイドライン</li>
      </ul>
      <Button
        style={{ fontWeight: 'bold' }}
        color="primary"
        variant="contained"
      >
        編集
      </Button>
    </NoStyledLink>
  </React.Fragment>
);

export default Documents;
