import * as React from 'react';
import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';

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
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {category &&
        topics &&
        (category.freezed ? (
          <Paper>
            <Title text="凍結しました" />
            <p>
              このコンテンツは不適切なコンテンツと判断して運営が凍結しました。
            </p>
          </Paper>
        ) : (
          <React.Fragment>
            <Header category={category} />
            <Body category={category} topics={topics} topicPath={topicPath} />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Category;
