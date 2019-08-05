import React, { useEffect } from 'react';

import { Text, Thumbnail } from 'native-base';
import { Link } from 'react-router-native';
import Progress from '../../atoms/CircularProgress';
import Avatar from '../../atoms/Avatar';

const { Table, Row } = require('react-native-table-component');

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const NoStyledRow = ({ data }: any) => (
    <Row
      borderStyle={{ borderColor: '#ffffff' }}
      data={data}
      flexArr={[1, 1, 3, 1, 1, 1, 2]}
    />
  );

  const tableHead = ['#', '', '名前', '点数', '連続', '最長', '最新'];

  const LeaderBoardHead = () => <NoStyledRow data={tableHead} />;

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {users && (
        <Table borderStyle={{ borderColor: '#ffffff' }}>
          <LeaderBoardHead />
          {users.map((user: any) => {
            const rowData = [
              `${user.rank}`,
              <Avatar
                photoURL={user.photoURL}
                key={user.id}
                small
                twitterUsername={user.twitterUsername}
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
            return <NoStyledRow data={rowData} key={user.id} />;
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
