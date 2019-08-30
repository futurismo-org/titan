import React, { useState, useEffect } from 'react';
import CategoryCard from '~/web/containers/ProfileCategoryCardContainer';

const ProfileCategories = (props: any) => {
  const categoryRefs = props.refs;
  const { userShortId } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getCategories = async () => {
      const categoryReads = await categoryRefs.map(
        (categoryRef: any) => categoryRef && categoryRef.get()
      );

      const data = await Promise.all(categoryReads).then((docs: any) =>
        docs.map((doc: any) => doc && doc.data()).filter((item: any) => item)
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
      {categories.length !== 0
        ? categories.map((item: any) => (
            <CategoryCard
              category={item}
              userShortId={userShortId}
              key={item.id}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ProfileCategories;
