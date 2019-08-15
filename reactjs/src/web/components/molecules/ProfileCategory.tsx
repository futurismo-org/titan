import React, { useEffect, useState } from 'react';
import { Fab } from '@material-ui/core';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ChallengePostRecord from './challenges/ChallengePostRecord';

import Paper from '../templates/PaperWrapper';
import NoStyledLink from '../atoms/NoStyledLink';
import { formatDatetime } from '~/lib/moment';

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
    dataLazy
  } = props;

  const [days, setDays] = useState(0);
  const [lastResetDate, setLastResetDate] = useState(new Date());

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
    fetchCategory(categoryResourceId);
  }, [
    categoryResourceId,
    fetchCategory,
    fetchProfileCategory,
    profileCategoryResourceId
  ]);

  dataLazy.then((d: any) => {
    setDays(d.days);
    setLastResetDate(d.lastResetDate);
  });

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
            <ChallengePostRecord days={days} />
          </div>
          <br />
          <br />
          <Title text="記録継続分析" />
          <br />
          <Title text="リセット分析" />
          <p>最終リセット日時: {formatDatetime(lastResetDate)}</p>
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
