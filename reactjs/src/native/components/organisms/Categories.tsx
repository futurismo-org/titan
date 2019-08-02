import * as React from 'react';
import Title from '../atoms/Title';
import Progress from '../atoms/CircularProgress';
import Error from '../atoms/Error';
import CollectionCard from '~/native/containers/CollectionCardContainer';

const Categories = (props: any) => {
  const { categories, error, loading, fetchCategories } = props;

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      <Title text="カテゴリ一覧" />
      {categories.map((category: any) => (
        <CollectionCard
          collection={category}
          type="categories"
          key={category.id}
        />
      ))}
    </React.Fragment>
  );
};

export default Categories;
