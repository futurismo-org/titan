import * as React from 'react';
import { formatDatetime } from '~/lib/moment';

const { Table, Row } = require('react-native-table-component');

// const getType = (type: string) => {
//   if (type === 'RESET') {
//     return <Chip color="primary" label="リセット" />;
//   }
//   return <Chip color="secondary" label="記録" />;
// };

// const HistoryRow = (props: any) => {
//   const { timestamp, score, type, days, diff } = props.history;

//   const wrapShowS = (x: string) => x || '';
//   const wrapShowN = (x: string) => x || 0;

//   return (
//     <TableRow>
//       <TableCell>
//         {wrapShowS(formatDate(timestamp.toDate().toISOString()))}
//       </TableCell>
//       <TableCell>{wrapShowN(score)}</TableCell>
//       <ConditionalTableCell>{wrapShowN(days)}</ConditionalTableCell>
//       <ConditionalTableCell>{wrapShowN(diff)}</ConditionalTableCell>
//       <TableCell>{getType(type)}</TableCell>
//     </TableRow>
//   );
// };

const tableHead = ['日時', 'スコア', 'タイプ'];
const HistoryHead = () => (
  <Row data={tableHead} style={{ backgroundColor: '#f1f8ff' }} />
);

const ChallengeHistories = (props: any) => {
  const { histories } = props;

  return (
    <Table>
      <HistoryHead />
      {histories
        .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
        .map((history: any) => {
          const rowData = [
            formatDatetime(history.timestamp.toDate()),
            history.score,
            history.type
          ];
          return <Row data={rowData} key={history.id} />;
        })}
    </Table>
  );
};

export default ChallengeHistories;
