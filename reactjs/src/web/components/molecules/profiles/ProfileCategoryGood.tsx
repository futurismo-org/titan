import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengePostRecord from '../challenges/ChallengePostRecord';

import Paper from '../../templates/PaperWrapper';
import NoStyledLink from '../../atoms/NoStyledLink';
import ProfileCategoryChallenges from './ProfileCategoryChallenges';
import { isMobile } from '~/web/lib/web';
import ProfileCategoryResetTimezoneChart from './ProfileCategoryResetTimezoneChart';
import ProfileCategoryResetDaysOfTheWeekChart from './ProfileCategoryResetDaysOfTheWeekChart';
import { CATEGORY_KIND_GOOD } from '~/lib/category';
import ProfileCategoryRecordChart from './ProfleCategoryRecordChart';

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

const ProfileCategoryGood = (props: any) => {
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
                  {metadata.joinedDate}
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
                      categoryKind={CATEGORY_KIND_GOOD}
                    />
                  </React.Fragment>
                )}
                <React.Fragment>
                  <Title text="記録統計" />
                  <h3>積算回数(週別)</h3>
                  <ProfileCategoryRecordChart
                    data={data.recordAccWeeks}
                    unit="count"
                  />
                  <h3>積算回数(月別)</h3>
                  <ProfileCategoryRecordChart
                    data={data.recordAccMonths}
                    unit="count"
                  />
                  <h3>時間帯別統計</h3>
                  <ProfileCategoryResetTimezoneChart
                    data={data.recordTimezones}
                  />
                  <h3>曜日別統計</h3>
                  <ProfileCategoryResetDaysOfTheWeekChart
                    data={data.recordDaysOfTheWeek}
                  />
                </React.Fragment>
                {data.minutesByMonths.lenght !== 0 && (
                  <React.Fragment>
                    <Title text="実施時間統計" />
                    <p>{data.totalMinutesMessage}</p>
                    <ProfileCategoryRecordChart
                      data={data.minutesByMonths}
                      unit="minutes"
                    />
                  </React.Fragment>
                )}
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

export default ProfileCategoryGood;
