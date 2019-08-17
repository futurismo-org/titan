import * as React from 'react';
import { formatDatetimeShort } from '~/lib/moment';
import { primaryColor, brandWhite, brandLightGray } from '~/lib/theme';

const { Table, Row } = require('react-native-table-component');

const flexArr = [1, 2, 2, 2];
const tableHead = ['試み', '継続', '開始', '終了'];

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

const ProfileCategoryHistories = (props: any) => {
  const { histories } = props;

  return (
    <Table style={{ marginTop: 10 }}>
      <HistoryHead />
      {histories.map((history: any) => {
        const { startDate, endDate, duration, attempt } = history;

        const rowData = [
          `${attempt}回目`,
          duration,
          formatDatetimeShort(startDate),
          formatDatetimeShort(endDate)
        ];
        return (
          <Row
            data={rowData}
            key={history.id}
            flexArr={flexArr}
            borderStyle={{ borderColor: brandLightGray }}
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

export default ProfileCategoryHistories;
