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
        {category.title}
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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ margin: 10 }}>
              <Title text={category.pageTitle} />
            </div>
            <CategoryButton category={category} />
          </div>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
