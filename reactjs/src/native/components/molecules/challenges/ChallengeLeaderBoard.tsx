import React, { useEffect } from 'react';

import { Text, Thumbnail } from 'native-base';
import { Link } from 'react-router-native';
import Progress from '../../atoms/CircularProgress';

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
      flexArr={[1, 1, 2, 1, 1, 1, 1]}
    />
  );

  const tableHead = ['順位', '', 'ユーザ名', 'スコア', '連続', '最長', '最新'];

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
              `${user.rank}位`,
              <Thumbnail source={{ uri: user.photoURL }} key={user.id} small />,
              <React.Fragment key={user.id}>
                <Link to={user.profilePath}>
                  <Text style={{ textDecorationLine: 'underline' }}>
                    {user.displayName}
                  </Text>
                </Link>
              </React.Fragment>,
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
