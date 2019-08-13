import * as React from 'react';

import { Text } from 'native-base';

import Progress from '../atoms/CircularProgress';
import Error from '../atoms/Error';
import Title from '../atoms/Title';

import { fromNow } from '~/lib/moment';
import UserAvatar from '../atoms/UserAvatar';
import { brandWhite } from '~/lib/theme';

const { Table, Row } = require('react-native-table-component');

const Users = (props: any) => {
  const { users, error, loading, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const tableHead = ['#', '', '名前', '最新'];
  const flexArr = [1, 1, 3, 1];

  const LeaderBoardHead = () => (
    <Row
      flexArr={flexArr}
      borderStyle={{ borderColor: '#ffffff' }}
      data={tableHead}
    />
  );

  return (
    <React.Fragment>
      <Title text="ユーザー情報" />
      <Text />
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && users && (
        <Table borderStyle={{ borderColor: brandWhite }}>
          <LeaderBoardHead />
          {users.map((user: any, index: number) => {
            const rowData = [
              `${index + 1}`,
              <UserAvatar
                photoURL={user.photoURL}
                key={user.id}
                small
                userId={user.shortId}
              />,
              user.displayName || 'Annonymous',
              fromNow(user.updatedAt.toDate())
            ];
            return <Row data={rowData} key={user.id} flexArr={flexArr} />;
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default Users;
