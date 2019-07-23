import React, { useEffect } from 'react';

import { Link } from 'react-router-native';
import { Text, Thumbnail } from 'native-base';
// import { getTwitterProfileURL } from '~/lib/url';
import Progress from '../../atoms/CircularProgress';

const { Table, Row } = require('react-native-table-component');

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const NoStyledRow = ({ data }: any) => (
    <Row borderStyle={{ borderColor: '#ffffff' }} data={data} />
  );

  const tableHead = ['順位', '', '名前', 'スコア', '最新'];

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
              <Thumbnail source={{ uri: user.photoURL }} key={user.id} />,
              <React.Fragment key={user.id}>
                <Link to={user.profilePath}>
                  <Text>{user.displayName}</Text>
                </Link>
              </React.Fragment>,
              user.score,
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
