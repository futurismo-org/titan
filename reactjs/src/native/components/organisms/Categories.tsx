import * as React from 'react';
import { View } from 'react-native';
import { isLoaded } from 'react-redux-firebase';
import Title from '../atoms/Title';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import { isReady } from '~/lib/firebase';

const Categories = (props: any) => {
  const { categories } = props;

  return (
    <React.Fragment>
      {!isLoaded(categories) && null}
      {isReady(categories) && <Title text="カテゴリ一覧" />}
      {isReady(categories) &&
        categories.map((category: any) => (
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
