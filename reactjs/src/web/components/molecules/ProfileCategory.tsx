import React, { useEffect } from 'react';
import { Fab } from '@material-ui/core';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';
import NoStyledLink from '../atoms/NoStyledLink';

const CategoryButton = (props: any) => {
  const { category } = props;

  return (
    <NoStyledLink to={`/cat/${category.id}/dashboard`}>
      <Fab variant="extended" style={{ fontWeight: 'bold' }} color="primary">
        {`${category.title}カテゴリ`}
      </Fab>
    </NoStyledLink>
  );
};

const ProfileCategory = (props: any) => {
  const {
    profileResourceId,
    categoryResourceId,
    fetchProfileCategory,
    fetchCategory,
    category,
    loading,
    error
  } = props;

  useEffect(() => {
    fetchProfileCategory(profileResourceId);
    fetchCategory(categoryResourceId);
  }, [
    categoryResourceId,
    fetchCategory,
    fetchProfileCategory,
    profileResourceId
  ]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && category && (
        <Paper>
          <Title text={category.pageTitle} />
          <div style={{ textAlign: 'right' }}>
            <CategoryButton category={category} />
          </div>
          <Title text="記録継続分析" />
          <Title text="リセット分析" />
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
