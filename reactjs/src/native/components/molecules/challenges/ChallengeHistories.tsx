import * as React from 'react';
import { Text } from 'native-base';
import { formatDatetime } from '~/lib/moment';

import { wrapShowN } from '~/lib/general';

import { primaryColor, secondaryColor } from '~/lib/theme';

const { Table, Row } = require('react-native-table-component');

const getDatetime = (date: Date) => (
  <Text style={{ fontSize: 12 }}>{formatDatetime(date)}</Text>
);

const getDelete = () => (
  <Text style={{ fontSize: 14, textDecorationLine: 'underline' }}>削除</Text>
);

const getType = (type: string) => {
  if (type === 'RESET') {
    return <Text style={{ color: primaryColor }}>RESET</Text>;
  }
  return <Text style={{ color: secondaryColor }}>RECORD</Text>;
};

const flexArr = [3, 2, 1, 1, 1, 1];

const tableHead = ['日時', 'タイプ', '点数', '連続', '累積', '過去', ''];
const HistoryHead = () => (
  <Row
    flexArr={flexArr}
    data={tableHead}
    borderStyle={{ borderColor: '#fff' }}
    style={{ backgroundColor: '#fff' }}
  />
);

const ChallengeHistories = (props: any) => {
  const { histories } = props;

  return (
    <Table borderStyle={{ borderColor: '#fff' }}>
      <HistoryHead />
      {histories
        .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
        .map((history: any) => {
          const rowData = [
            getDatetime(history.timestamp.toDate()),
            getType(history.type),
            wrapShowN(history.score),
            wrapShowN(history.days),
            wrapShowN(history.accDays),
            wrapShowN(history.pastDays),
            getDelete()
          ];
          return (
            <Row
              data={rowData}
              key={history.id}
              flexArr={flexArr}
              borderStyle={{ borderColor: '#fff' }}
              style={{ backgroundColor: '#fff' }}
            />
          );
        })}
    </Table>
  );
};

export default ChallengeHistories;
