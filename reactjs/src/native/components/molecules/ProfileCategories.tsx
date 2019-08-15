import React, { useState, useEffect } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CollectionCard from '~/native/containers/CollectionCardContainer';

import { deviceWidth } from '~/native/lib/native';
import { brandGray } from '~/lib/theme';

const ProfileCategories = (props: any) => {
  const categoryRefs = props.refs;

  const [categories, setCategories] = useState([]);
  const [categoryActiveSlide, setCategoryActiveSlide] = useState(0);
  const [categorySliderRef, setCategorySliderRef] = useState(undefined);

  const _renderCategoryItem = (props: any) => {
    const { item, index } = props;
    return <CollectionCard collection={item} type="categories" key={index} />;
  };

  useEffect(() => {
    let mounted = true;

    const getCategories = async () => {
      const categoryReads = await categoryRefs.map(
        (categoryRef: any) => categoryRef && categoryRef.get()
      );

      const data = await Promise.all(categoryReads).then((docs: any) =>
        docs.map((doc: any) => doc && doc.data())
      );

      if (mounted) {
        setCategories(data);
      }
    };

    getCategories();

    return () => {
      mounted = false;
    };
  }, [categoryRefs]);

  return (
    <React.Fragment>
      <Carousel
        ref={(c: any) => setCategorySliderRef(c)}
        data={categories}
        renderItem={_renderCategoryItem}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
        onSnapToItem={index => setCategoryActiveSlide(index)}
      />
      <Pagination
        dotsLength={categories.length}
        activeDotIndex={categoryActiveSlide}
        containerStyle={{ paddingVertical: 0 }}
        dotColor="gray"
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 8,
          marginVertical: 8
        }}
        inactiveDotColor={brandGray}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={categorySliderRef}
        tappableDots={!!categorySliderRef}
      />
    </React.Fragment>
  );
};

export default ProfileCategories;
