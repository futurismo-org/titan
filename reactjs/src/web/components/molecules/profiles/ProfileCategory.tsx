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
  BarChart
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
import { windowWidth } from '~/web/lib/web';

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
            </div>
          </div>
          <br />
          <br />
          <Title text="継続統計" />
          <p>{data.myBest}</p>
          <p>過去最高: {data.maxDays}日</p>
          <p>最終リセット日時: {data.lastResetDate}</p>
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
          <h3>リセット累積回数</h3>
          <LineChart
            width={windowWidth - 300}
            height={350}
            data={data.resetAccs}
          >
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <h3>時間帯別統計</h3>
              <BarChart
                width={400}
                height={300}
                data={data.resetTimezones}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={primaryColor} />
              </BarChart>
            </div>
            <div>
              <h3>曜日別統計</h3>
              <BarChart
                width={400}
                height={300}
                data={data.resetDaysOfTheWeek}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={primaryColor} />
              </BarChart>
            </div>
          </div>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
