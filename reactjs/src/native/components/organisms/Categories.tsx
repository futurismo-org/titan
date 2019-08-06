import * as React from 'react';
import { View } from 'react-native';
import Title from '../atoms/Title';
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
      {loading && null}
      {categories && <Title text="カテゴリ一覧" />}
      {categories.map((category: any) => (
        <View style={{ marginTop: 5, marginBottom: 5 }} key={category.id}>
          <CollectionCard
            collection={category}
            type="categories"
            key={category.id}
          />
        </View>
      ))}
    </React.Fragment>
  );
};

export default Categories;
