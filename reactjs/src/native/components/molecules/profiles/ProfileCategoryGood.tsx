import React, { useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { material } from 'react-native-typography';

import { withRouter } from 'react-router-native';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import ChallengePostRecord from '../challenges/ChallengePostRecord';
// import ProfileCategoryRecordChart from './ProfileCategoryRecordChart';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
// import ProfileCategoryResetTimezoneChart from './ProfileCategoryResetTimezoneChart';
// import ProfileCategoryResetDaysOfTheWeekChart from './ProfileCategoryResetDaysOfTheWeekChart';
import { CATEGORY_KIND_GOOD } from '~/lib/category';

const Headline = (props: any) => {
  const { text } = props;
  return (
    <Text style={[material.headline, { fontWeight: 'bold' }]}>{text}</Text>
  );
};

// const Subheading = (props: any) => {
//   const { text } = props;
//   return (
//     <Text style={[material.subheading, { fontWeight: 'bold' }]}>{text}</Text>
//   );
// };

const ProfileCategoryBad = (props: any) => {
  const {
    profileCategoryResourceId,
    fetchProfileCategory,
    profileCategoryHistoriesResourceId,
    fetchHistories,
    fetchProfileChallenges,
    profileChallengesResourceId,
    loading,
    error,
    metadata,
    data,
    history,
    userShortId
  } = props;

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
    fetchHistories(profileCategoryHistoriesResourceId);
    fetchProfileChallenges(profileChallengesResourceId);
  }, [
    fetchHistories,
    fetchProfileCategory,
    fetchProfileChallenges,
    profileCategoryHistoriesResourceId,
    profileCategoryResourceId,
    profileChallengesResourceId
  ]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading &&
        metadata &&
        data &&
        (Object.keys(data).length === 0 ? (
          <View
            style={{
              margin: 10
            }}
          >
            <Text>表示できるデータがありません。</Text>
          </View>
        ) : (
          <View
            style={{
              margin: 10
            }}
          >
            <Title text={metadata.headline} />
            <ChallengePostRecord days={data.days} />
            <Text />
            <Text
              style={{
                fontSize: 20,
                textDecorationLine: 'underline',
                textAlign: 'center'
              }}
            >
              {metadata.joinedDate}
            </Text>
            {data.challenges.length !== 0 && (
              <React.Fragment>
                <Text />
                <Headline text="チャレンジごとの実績" />
                <ProfileCategoryChallenges
                  challenges={data.challenges}
                  userShortId={userShortId}
                  categoryKind={CATEGORY_KIND_GOOD}
                />
                <Text />
              </React.Fragment>
            )}
            <React.Fragment>
              <View
                style={{
                  margin: 20,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    textDecorationLine: 'underline'
                  }}
                >
                  {data.myBest}
                </Text>
              </View>
              {/* <Headline text="記録統計" />
              <Subheading text="積算回数(週別)" />
              <ProfileCategoryRecordChart data={data.recordAccWeeks} />
              <Subheading text="積算回数(月別)" />
              <ProfileCategoryRecordChart data={data.recordAccMonths} /> */}
              {/* <Subheading text="時間帯別統計" />
              <ProfileCategoryResetTimezoneChart data={data.recordTimezones} /> */}
              {/* クラッシュするのでいったんマスク */}
              {/* <Text /> */}
              {/* <Subheading text="曜日別統計" />
              <ProfileCategoryResetDaysOfTheWeekChart
                data={data.recordDaysOfTheWeek}
              /> */}
              {/* {data.minutesByMonths && data.minutesByMonths.lenght !== 0 && (
                <React.Fragment>
                  <Headline text="実施時間統計" />
                  <Text>{data.totalMinutesMessage}</Text>
                  <ProfileCategoryRecordChart
                    data={data.minutesByMonths}
                    unit="minutes"
                  />
                </React.Fragment>
              )} */}
            </React.Fragment>
            <Text />
            <Button
              full
              rounded
              onPress={() =>
                history.push(`/cat/${metadata.categoryId}/dashboard`)
              }
            >
              <Text>{metadata.categoryTitle}カテゴリへ</Text>
            </Button>
          </View>
        ))}
    </React.Fragment>
  );
};

export default withRouter(ProfileCategoryBad);
