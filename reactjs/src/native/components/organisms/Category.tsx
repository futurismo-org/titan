import * as React from 'react';

import { Text } from 'native-base';

import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';
import Error from '../atoms/Error';

const Category = (props: any) => {
  const {
    category,
    loading,
    error,
    fetchCategory,
    resourceId,
    topics,
    fetchTopics,
    topicsResourceId,
    topicPath
  } = props;

  React.useEffect(() => {
    fetchCategory(resourceId);
    fetchTopics(topicsResourceId);
  }, [fetchCategory, fetchTopics, resourceId, topicsResourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {category && (
        <React.Fragment>
          <Header category={category} />
          <Body category={category} topics={topics} topicPath={topicPath} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;
