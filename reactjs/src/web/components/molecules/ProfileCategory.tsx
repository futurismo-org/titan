import React, { useEffect } from 'react';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';

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
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ProfileCategory;
