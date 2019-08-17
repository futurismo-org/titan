import React, { useState } from 'react';
import { Text } from 'native-base';
import AlertPro from 'react-native-alert-pro';

import { formatDatetime } from '~/lib/moment';

import { wrapShowN } from '~/lib/general';

import {
  primaryColor,
  secondaryColor,
  brandWhite,
  brandLightGray
} from '~/lib/theme';
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

// const DeleteWithAlertWithRouter = withRouter(DeleteWithAlert);

const getType = (type: string) => {
  if (type === RESET) {
    return <Text style={{ color: primaryColor }}>RESET</Text>;
  }
  return <Text style={{ color: secondaryColor }}>RECORD</Text>;
};

const flexArr = [3, 2, 1, 1, 1, 1];
const tableHead = ['日時', 'タイプ', '点数', '連続', '累積', '過去'];

const HistoryHead = (props: any) => (
  <Row
    flexArr={flexArr}
    data={tableHead}
    borderStyle={{ borderColor: primaryColor }}
    style={{ backgroundColor: primaryColor }}
    textStyle={{
      color: brandWhite,
      fontWeight: 'bold',
      padding: 10
    }}
  />
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
              borderStyle={{ borderColor: brandLightGray, borderWidth: 1 }}
              textStyle={{
                fontWeight: 'bold',
                padding: 5
              }}
            />
          );
        })}
    </Table>
  );
};

export default ChallengeHistories;
