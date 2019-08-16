import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  Legend,
  YAxis
} from 'recharts';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengePostRecord from '../challenges/ChallengePostRecord';

import Paper from '../../templates/PaperWrapper';
import NoStyledLink from '../../atoms/NoStyledLink';
import ProfileCategoryHistories from './ProfileCategoryHistories';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
import theme from '~/lib/theme';

const CategoryButton = (props: any) => {
  const { categoryTitle, categoryId } = props;

  return (
    <NoStyledLink to={`/cat/${categoryId}/dashboard`}>
      <Fab variant="extended" style={{ fontWeight: 'bold' }} color="primary">
        {`${categoryTitle}カテゴリ`}
      </Fab>
    </NoStyledLink>
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
        <Paper>
          <div style={{ textAlign: 'center' }}>
            <Title text={metadata.headline} />
          </div>
          <div style={{ maxWidth: 750, margin: 'auto' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ChallengePostRecord days={data.days} />
            </div>
          </div>
          <br />
          <br />
          <Title text="継続統計" />
          <p>{data.myBest}</p>
          <p>過去最高: {data.maxDays}日</p>
          <br />
          <Title text="継続ログの要約" />
          <ProfileCategoryHistories histories={data.summerized} />
          <br />
          <br />
          <Title text="チャレンジごとの実績" />
          <ProfileCategoryChallenges challenges={data.challenges} />
          <br />
          <br />
          <Title text="リセット分析" />
          <p>最終リセット日時: {data.lastResetDate}</p>
          <LineChart width={400} height={350} data={data.resetAccs}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              name="リセット数"
              stroke={theme.palette.primary.main}
            />
          </LineChart>
          <div style={{ textAlign: 'right' }}>
            <CategoryButton
              categoryId={metadata.categoryId}
              categoryTitle={metadata.categoryTitle}
            />
          </div>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
