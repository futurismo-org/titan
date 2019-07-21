import * as React from 'react';
import Title from '../atoms/Title';
import Progress from '../atoms/CircularProgress';
import CollectionCard from '../atoms/CollectionCard';

const Categories = (props: any) => {
  const { categories, error, loading, fetchCategories } = props;

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      <Title text="カテゴリ一覧" />
      {categories.map((category: any) => (
        <CollectionCard collection={category} key={category.id} />
      ))}
    </React.Fragment>
  );
};

export default Categories;
