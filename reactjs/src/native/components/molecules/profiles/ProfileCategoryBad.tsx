import React, { useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { material } from 'react-native-typography';

import { withRouter } from 'react-router-native';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import ChallengePostRecord from '../challenges/ChallengePostRecord';
import ProfileCategoryHistories from './ProfileCategoryHistories';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
import ProfileCategoryResetTimezoneChart from './ProfileCategoryResetTimezoneChart';
import ProfileCategoryResetDaysOfTheWeekChart from './ProfileCategoryResetDaysOfTheWeekChart';
import { CATEGORY_KIND_BAD } from '~/lib/category';

const Headline = (props: any) => {
  const { text } = props;
  return (
    <Text style={[material.headline, { fontWeight: 'bold' }]}>{text}</Text>
  );
};

const Subheading = (props: any) => {
  const { text } = props;
  return (
    <Text style={[material.subheading, { fontWeight: 'bold' }]}>{text}</Text>
  );
};

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
            {data.challenges.length !== 0 && (
              <React.Fragment>
                <Headline text="チャレンジごとの実績" />
                <ProfileCategoryChallenges
                  challenges={data.challenges}
                  userShortId={userShortId}
                  categoryKind={CATEGORY_KIND_BAD}
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
              <Headline text="継続記録統計" />
              <Text>過去最高継続日数: {data.maxDays}日</Text>
              <Text>最終リセット日時: {data.lastResetDate}</Text>
              <ProfileCategoryHistories histories={data.summerized} />
              <Text />
              <Headline text="リセット統計" />
              <Text />
              {/* スマホではきついので封印。やるならば、月や年単位でまとめる */}
              {/* <Subheading text="積算回数" />
                <ProfileCategoryResetChart data={data.resetAccs} /> */}
              <Subheading text="時間帯別統計" />
              <ProfileCategoryResetTimezoneChart data={data.resetTimezones} />
              <Text />
              <Subheading text="曜日別統計" />
              <ProfileCategoryResetDaysOfTheWeekChart
                data={data.resetDaysOfTheWeek}
              />
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
