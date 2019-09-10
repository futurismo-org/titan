import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengePostRecord from '../challenges/ChallengePostRecord';

import Paper from '../../templates/PaperWrapper';
import NoStyledLink from '../../atoms/NoStyledLink';
import ProfileCategoryHistories from './ProfileCategoryHistories';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
import { isMobile } from '~/web/lib/web';
import ProfileCategoryResetChart from './ProfleCategoryResetChart';
import ProfileCategoryResetTimezoneChart from './ProfileCategoryResetTimezoneChart';
import ProfileCategoryResetDaysOfTheWeekChart from './ProfileCategoryResetDaysOfTheWeekChart';

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
          <Paper>
            <p>表示できるデータがありません。</p>
          </Paper>
        ) : (
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
                {data.challenges.length !== 0 && (
                  <React.Fragment>
                    <Title text="チャレンジごとの実績" />
                    <ProfileCategoryChallenges
                      challenges={data.challenges}
                      userShortId={userShortId}
                    />
                  </React.Fragment>
                )}
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
                    <ProfileCategoryResetChart data={data.resetAccs} />
                  </div>
                  <h3>時間帯別統計</h3>
                  <ProfileCategoryResetTimezoneChart
                    data={data.resetTimezones}
                  />
                  <h3>曜日別統計</h3>
                  <ProfileCategoryResetDaysOfTheWeekChart
                    data={data.resetDaysOfTheWeek}
                  />
                </React.Fragment>
              </React.Fragment>
            ) : (
              <p>
                ダッシュボードによる分析は大きな画面からのアクセスで有効になります。
              </p>
            )}
          </Paper>
        ))}
    </React.Fragment>
  );
};

export default ProfileCategoryBad;
