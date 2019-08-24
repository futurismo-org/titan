import React, { useState, useEffect } from 'react';

import { Table, Row } from 'react-native-table-component';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import moment, { fromNow } from '~/lib/moment';
import UserAvatar from '../atoms/UserAvatar';
import {
  brandWhite,
  primaryColor,
  brandLightGray,
  leaderboardMyColor
} from '~/lib/theme';

const RADIO_SCORE_LABEL = '点数';
const RADIO_LATEST_LABEL = '最新';
// const RADIO_REGISTERD_LABEL = '登録';

const RADIO_SCORE = 0;
const RADIO_LATEST = 1;
const RADIO_REGISTERD = 2;

const Users = (props: any) => {
  const { users, loading, myId } = props;

  const [sortkey, setSortKey] = useState(RADIO_SCORE);

  const tableHead = ['#', '', '名前', RADIO_SCORE_LABEL, RADIO_LATEST_LABEL];
  const flexArr = [1, 2, 6, 2, 2];

  const compare = (x: any, y: any) => {
    if (sortkey === RADIO_LATEST) {
      return moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()));
    } else if (sortkey === RADIO_REGISTERD) {
      return moment(y.createdAt.toDate()).diff(moment(x.createdAt.toDate()));
    } else if (sortkey === RADIO_SCORE) {
      return y.toralScore === x.totalScore
        ? 0
        : y.totalScore > x.totalScore
        ? 1
        : -1;
    }
  };

  const LeaderBoardHead = () => (
    <Row
      flexArr={flexArr}
      borderStyle={{ borderColor: primaryColor }}
      style={{ backgroundColor: primaryColor }}
      textStyle={{
        color: brandWhite,
        fontWeight: 'bold',
        padding: 10
      }}
      data={tableHead}
    />
  );

  // const radioProps = [
  //   { label: RADIO_SCORE_LABEL, value: RADIO_SCORE },
  //   { label: RADIO_LATEST_LABEL, value: RADIO_SCORE }
  // ];

  // const onSortKeyPress = (value: number) => {
  //   setSortKey(value);
  // };

  return (
    <React.Fragment>
      <Title text="ユーザーランキング" />
      {/* <RadioForm
        buttonColor={primaryColor}
        selectedButtonColor={primaryColor}
        buttonSize={10}
        animation
        initial={RADIO_SCORE}
        radio_props={radioProps}
        onPress={onSortKeyPress}
        formHorizontal
      /> */}
      {loading && <Progress />}
      {!loading && !!users && (
        <Table style={{ margin: 10 }}>
          <LeaderBoardHead />
          {users.sort(compare).map((user: any, index: number) => {
            const userId = user.shortId;
            const rowData = [
              `${index + 1}`,
              <UserAvatar
                photoURL={user.photoURL}
                key={user.id}
                small
                userId={userId}
              />,
              user.displayName || 'Annonymous',
              user.totalScore || 0,
              fromNow(user.updatedAt.toDate())
            ];

            const backgroundColor =
              userId && myId === userId ? leaderboardMyColor : brandWhite;
            const borderColor =
              userId && myId === userId ? leaderboardMyColor : brandLightGray;

            return (
              <Row
                data={rowData}
                key={user.id}
                flexArr={flexArr}
                borderStyle={{ borderColor }}
                style={{ backgroundColor }}
                textStyle={{
                  fontWeight: 'bold',
                  padding: 5
                }}
              />
            );
          })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default Users;
