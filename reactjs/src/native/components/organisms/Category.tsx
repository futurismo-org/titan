import * as React from 'react';

import { Text } from 'native-base';

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
    challengeRefs,
    fetchChallenges,
    challenges
  } = props;

  React.useEffect(() => {
    if (!category) {
      fetchCategory(resourceId);
    } else {
      fetchChallenges(challengeRefs);
    }
  }, [category, challengeRefs, fetchCategory, fetchChallenges, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
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
