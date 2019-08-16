import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ChallengePostRecord from './challenges/ChallengePostRecord';

import Paper from '../templates/PaperWrapper';
import NoStyledLink from '../atoms/NoStyledLink';

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
    loading,
    error,
    metadata,
    data
  } = props;

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
    fetchCategory(categoryResourceId);
  }, [
    categoryResourceId,
    fetchCategory,
    fetchProfileCategory,
    profileCategoryResourceId
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
          <div style={{ width: 320, margin: '0 auto' }}>
            <ChallengePostRecord days={data.days} />
          </div>
          <br />
          <br />
          <Title text="記録継続分析" />
          <p>{data.myBest}</p>
          <p>過去最高: {data.maxDays}日</p>
          <br />
          <Title text="リセット分析" />
          <p>最終リセット日時: {data.lastResetDate}</p>
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
