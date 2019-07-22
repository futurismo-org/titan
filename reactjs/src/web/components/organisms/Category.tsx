import * as React from 'react';
import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';

const Category = (props: any) => {
  const {
    category,
    loading,
    error,
    fetchCategory,
    resourceId,
    fetchChallenges,
    challengeRefs,
    challenges
  } = props;

  React.useEffect(() => {
    !category && !loading && fetchCategory(resourceId);
    !category && !challenges && !loading && fetchChallenges(challengeRefs);
  }, [
    category,
    challengeRefs,
    challenges,
    fetchCategory,
    fetchChallenges,
    loading,
    resourceId
  ]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {category && (
        <React.Fragment>
          <Header category={category} />
          <Body category={category} challenges={challenges} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;
