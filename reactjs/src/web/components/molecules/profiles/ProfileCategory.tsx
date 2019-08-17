import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  Legend,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer
} from 'recharts';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengePostRecord from '../challenges/ChallengePostRecord';

import Paper from '../../templates/PaperWrapper';
import NoStyledLink from '../../atoms/NoStyledLink';
import ProfileCategoryHistories from './ProfileCategoryHistories';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
import theme, { primaryColor } from '~/lib/theme';
import { isMobile } from '~/web/lib/web';

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
    data,
    userShortId
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
          <div style={{ textAlign: 'right' }}>
            <CategoryButton
              categoryId={metadata.categoryId}
              categoryTitle={metadata.categoryTitle}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1>{metadata.headline}</h1>
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
              <p style={{ fontSize: 20, textDecorationLine: 'underline' }}>
                {data.myBest}
              </p>
            </div>
          </div>
          {!isMobile ? (
            <React.Fragment>
              <Title text="継続記録統計" />
              <p>過去最高継続日数: {data.maxDays}日</p>
              <p>最終リセット日時: {data.lastResetDate}</p>
              <ProfileCategoryHistories histories={data.summerized} />
              <br />
              <br />
              <Title text="リセット統計" />
              <div>
                <h3>積算回数</h3>
                <ResponsiveContainer width="99%" aspect={4}>
                  <LineChart data={data.resetAccs}>
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
                </ResponsiveContainer>
              </div>
              <h3>時間帯別統計</h3>
              <ResponsiveContainer width="99%" aspect={4}>
                <BarChart data={data.resetTimezones}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill={primaryColor} />
                </BarChart>
              </ResponsiveContainer>
              <h3>曜日別統計</h3>
              <ResponsiveContainer width="99%" aspect={4}>
                <BarChart data={data.resetDaysOfTheWeek}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill={primaryColor} />
                </BarChart>
              </ResponsiveContainer>
              <Title text="チャレンジごとの実績" />
              <ProfileCategoryChallenges
                challenges={data.challenges}
                userShortId={userShortId}
              />
            </React.Fragment>
          ) : (
            <p>
              ダッシュボードによる分析は大きな画面からのアクセスで有効になります。
            </p>
          )}
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
