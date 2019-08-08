import React, { useEffect } from 'react';

import { Text } from 'native-base';
import { Link } from 'react-router-native';
import Error from '../../atoms/Error';
import UserAvatar from '../../atoms/UserAvatar';

import { leaderboardMyColor } from '~/lib/theme';

const { Table, Row } = require('react-native-table-component');

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers, myId } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const NoStyledRow = (props: any) => {
    const { data, userId } = props;
    const color = userId && myId === userId ? leaderboardMyColor : '#fff';

    return (
      <Row
        borderStyle={{ borderColor: color }}
        style={{ backgroundColor: color }}
        data={data}
        flexArr={[1, 1, 3, 1, 1, 1, 2]}
      />
    );
  };

  const tableHead = ['#', '', '名前', '点数', '連続', '最長', '最新'];

  const LeaderBoardHead = () => <NoStyledRow data={tableHead} />;

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && users && (
        <Table borderStyle={{ borderColor: '#ffffff' }}>
          <LeaderBoardHead />
          {users.map((user: any) => {
            const rowData = [
              `${user.rank}`,
              <UserAvatar
                photoURL={user.photoURL}
                userId={user.id}
                small
                key={user.id}
              />,
              <Link to={user.profilePath} key={user.id}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 15 }}>
                  {user.displayName}
                </Text>
              </Link>,
              user.score,
              user.days,
              user.maxDays,
              user.latest
            ];
            return (
              <NoStyledRow data={rowData} key={user.id} userId={user.id} />
            );
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
