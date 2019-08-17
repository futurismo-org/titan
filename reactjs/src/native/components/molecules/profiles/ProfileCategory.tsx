import React, { useEffect } from 'react';
import { View, Content, Text, Button } from 'native-base';
import { material } from 'react-native-typography';

import { withRouter } from 'react-router-native';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import ChallengePostRecord from '../challenges/ChallengePostRecord';
import ProfileCategoryHistories from './ProfileCategoryHistories';

const Headline = (props: any) => {
  const { text } = props;
  return (
    <Text style={[material.headline, { fontWeight: 'bold' }]}>{text}</Text>
  );
};

const ProfileCategory = (props: any) => {
  const {
    categoryResourceId,
    profileCategoryResourceId,
    fetchProfileCategory,
    fetchCategory,
    profileCategoryHistoriesResourceId,
    fetchHistories,
    fetchProfileChallenges,
    profileChallengesResourceId,
    loading,
    error,
    metadata,
    data,
    history
  } = props;

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
    fetchCategory(categoryResourceId);
    fetchHistories(profileCategoryHistoriesResourceId);
    fetchProfileChallenges(profileChallengesResourceId);
  }, [
    categoryResourceId,
    fetchCategory,
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
      {!loading && metadata && (
        <View
          style={{
            margin: 10
          }}
        >
          <Title text={metadata.headline} />
          <ChallengePostRecord days={data.days} />
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
          <Headline text="継続統計" />
          <Text>過去最高: {data.maxDays}日</Text>
          <Text>最終リセット日時: {data.lastResetDate}</Text>
          <Text />
          <Headline text="継続ログの要約" />
          <ProfileCategoryHistories histories={data.summerized} />
          <Text />
          <Headline text="チャレンジごとの実績" />
          <Text />
          <Headline text="リセット統計" />
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
      )}
    </React.Fragment>
  );
};

export default withRouter(ProfileCategory);
