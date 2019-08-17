import React, { useEffect } from 'react';
import { View, Content, Text } from 'native-base';
import { material } from 'react-native-typography';

import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import ChallengePostRecord from '../challenges/ChallengePostRecord';

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
    data
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
        <View>
          <Content padder>
            <Title text={metadata.headline} />
            <ChallengePostRecord days={data.days} />
            <View style={{ margin: 10 }}>
              <Headline text="継続統計" />
              <Headline text="継続ログの要約" />
              <Headline text="チャレンジごとの実績" />
              <Headline text="リセット統計" />
            </View>
          </Content>
        </View>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
