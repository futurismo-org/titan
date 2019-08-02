import * as React from 'react';

import { Text, Thumbnail } from 'native-base';

import Progress from '../atoms/CircularProgress';
import Error from '../atoms/Error';
import Title from '../atoms/Title';

import { fromNow } from '~/lib/moment';
import Avatar from '../atoms/Avatar';

const { Table, Row } = require('react-native-table-component');

const Ranking = (props: any) => {
  const { users, error, loading, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const tableHead = ['順位', '', '名前', '最新'];

  const LeaderBoardHead = () => (
    <Row
      flexArr={[1, 1, 2, 1]}
      borderStyle={{ borderColor: '#ffffff' }}
      data={tableHead}
    />
  );

  return (
    <React.Fragment>
      <Title text="ユーザランキング" />
      <Text>ランキング機能は準備中です...</Text>
      <Text>データが不十分なため、 アクティブユーザを順に表示しています。</Text>
      <Text />
      {error && <Error error={error} />}
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
              <Avatar
                photoURL={uri}
                key={user.id}
                small
                twitterUsername={user.twitterUsername}
              />,
              user.displayName || 'Annonymous',
              fromNow(user.updatedAt.toDate())
            ];
            return <Row data={rowData} key={user.id} flexArr={[1, 1, 2, 1]} />;
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default Ranking;
