import * as React from 'react';

import { Text, Thumbnail } from 'native-base';

import { Link } from 'react-router-native';
import { getTwitterProfileURL } from '~/lib/url';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import { fromNow } from '~/lib/moment';

const {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} = require('react-native-table-component');

const Ranking = (props: any) => {
  const { users, error, loading, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const tableHead = ['順位', '', '名前', '最新'];

  const LeaderBoardHead = () => (
    <Row borderStyle={{ borderColor: '#ffffff' }} data={tableHead} />
  );

  return (
    <React.Fragment>
      <Title text="ユーザランキング" />
      <Text>ランキング機能は準備中です...</Text>
      <Text>データが不十分なため、 アクティブユーザを順に表示しています。</Text>
      <Text />
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {users && (
        <Table borderStyle={{ borderColor: '#ffffff' }}>
          <LeaderBoardHead />
          {users.map((user: any, index: number) => {
            const uri = user.photoURL
              ? user.photoURL
              : 'https://titan-fire.com/anonymous.png';

            const rowData = [
              `${index + 1}位`,
              <Thumbnail source={{ uri: uri }} key={user.id} />,
              user.displayName || 'Annonymous',
              fromNow(user.updatedAt.toDate())
            ];
            return <Row data={rowData} key={user.id} />;
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default Ranking;
