import React from 'react';

import { withRouter } from 'react-router-native';
import moment, { formatYearDate } from '~/lib/moment';
import { brandWhite } from '~/lib/theme';

const { Table, Row } = require('react-native-table-component');

const flexArr = [3, 1, 1, 1, 2];
const tableHead = ['タイトル', '順位', 'スコア', '上位', '終了日'];

const HistoryHead = () => (
  <Row
    flexArr={flexArr}
    data={tableHead}
    borderStyle={{ borderColor: brandWhite }}
    style={{ backgroundColor: brandWhite }}
  />
);

const ProfileChallenges = (props: any) => {
  const { challenges, userShortId, history } = props;

  return (
    <Table borderStyle={{ borderColor: brandWhite }}>
      <HistoryHead />
      {challenges.map((challenge: any) => {
        const rowData = [
          challenge.title,
          `${challenge.rank}位`,
          challenge.score,
          `${challenge.ratio}%`,
          formatYearDate(challenge.closedAt.toDate())
        ];
        return (
          <Row
            data={rowData}
            key={challenge.id}
            flexArr={flexArr}
            borderStyle={{ borderColor: brandWhite }}
            style={{ backgroundColor: brandWhite }}
            onPress={() =>
              history.push(`/c/${challenge.id}/u/${userShortId}/dashboard`)
            }
          />
        );
      })}
    </Table>
  );
};

export default withRouter(ProfileChallenges);
