import React, { useEffect } from 'react';

import { Text } from 'native-base';
import { Link } from 'react-router-native';
import Error from '../../atoms/Error';
import UserAvatar from '../../atoms/UserAvatar';

import {
  leaderboardMyColor,
  brandWhite,
  primaryColor,
  brandLightGray
} from '~/lib/theme';
import Progress from '~/native/components/atoms/CircularProgress';

const { Table, Row } = require('react-native-table-component');

const flexArr = [1, 1, 3, 1, 1, 1, 2];

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers, myId } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const StyledHeadRow = (props: any) => {
    const { data } = props;

    return (
      <Row
        borderStyle={{ borderColor: primaryColor }}
        style={{ backgroundColor: primaryColor }}
        textStyle={{
          color: brandWhite,
          fontWeight: 'bold',
          padding: 10
        }}
        data={data}
        flexArr={flexArr}
      />
    );
  };

  const StyledRow = (props: any) => {
    const { data, userId } = props;
    const backgroundColor =
      userId && myId === userId ? leaderboardMyColor : brandWhite;
    const borderColor =
      userId && myId === userId ? leaderboardMyColor : brandLightGray;

    return (
      <Row
        textStyle={{
          fontWeight: 'bold',
          padding: 5
        }}
        borderStyle={{ borderColor }}
        style={{ backgroundColor }}
        data={data}
        flexArr={flexArr}
      />
    );
  };

  const tableHead = ['#', '', '名前', '点数', '連続', '最長', '最新'];

  const LeaderBoardHead = () => <StyledHeadRow data={tableHead} />;

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && users && (
        <Table style={{ margin: 5 }}>
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
            return <StyledRow data={rowData} key={user.id} userId={user.id} />;
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
