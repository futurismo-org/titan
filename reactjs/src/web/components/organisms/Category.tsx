import * as React from 'react';
import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';

const Category = (props: any) => {
  const { category, loading, error, fetchCategory, resourceId } = props;

  React.useEffect(() => {
    fetchCategory(resourceId);
  }, [fetchCategory, resourceId]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {category && (
        <React.Fragment>
          <Header category={category} />
          <Body category={category} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;
