import React, { useState } from 'react';
import { Text } from 'native-base';
import AlertPro from 'react-native-alert-pro';

import { withRouter } from 'react-router-native';
import { formatDatetime } from '~/lib/moment';

import { wrapShowN } from '~/lib/general';

import { primaryColor, secondaryColor } from '~/lib/theme';
import { RESET } from '~/lib/challenge';

const { Table, Row } = require('react-native-table-component');

const getDatetime = (date: Date) => (
  <Text style={{ fontSize: 12 }}>{formatDatetime(date)}</Text>
);

const DeleteWithAlert = (props: any) => {
  const { historyObj, handler, history } = props;
  const [alert, setAlert] = useState();

  return (
    <React.Fragment>
      <Text
        onPress={() => alert.open()}
        style={{ textDecorationLine: 'underline' }}
      >
        削除
      </Text>
      <AlertPro
        ref={(ref: any) => setAlert(ref)}
        onConfirm={() => {
          handler().then(() => {
            alert.close();
            history.push('/');
            history.push(props.location.pathname);
          });
        }}
        onCancel={() => alert.close()}
        title="記録の削除"
        message={`記録(${historyObj.type} ${formatDatetime(
          historyObj.timestamp.toDate()
        )})を削除します。よろしいですか？`}
        textCancel="いいえ"
        textConfirm="削除"
        customStyles={{
          message: { lineHeight: 15 }
        }}
      />
    </React.Fragment>
  );
};

const DeleteWithAlertWithRouter = withRouter(DeleteWithAlert);

const getType = (type: string) => {
  if (type === RESET) {
    return <Text style={{ color: primaryColor }}>RESET</Text>;
  }
  return <Text style={{ color: secondaryColor }}>RECORD</Text>;
};

const flexArr = [3, 2, 1, 1, 1, 1];

const tableHead = ['日時', 'タイプ', '点数', '連続', '累積', '過去'];
const HistoryHead = () => (
  <Row
    flexArr={flexArr}
    data={tableHead}
    borderStyle={{ borderColor: '#fff' }}
    style={{ backgroundColor: '#fff' }}
  />
);

const ChallengeHistories = (props: any) => {
  const { histories, handler } = props;

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
            wrapShowN(history.pastDays)
            // <DeleteWithAlertWithRouter
            //   key={history.id}
            //   historyObj={history}
            //   handler={handler(history)}
            // />
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
