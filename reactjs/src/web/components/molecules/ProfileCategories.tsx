import React, { useState, useEffect } from 'react';
import CollectionCard from '../atoms/CollectionCard';

const ProfileCategories = (props: any) => {
  const categoryRefs = props.refs;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getCategories = async () => {
      const categoryReads = await categoryRefs.map(
        (categoryRef: any) => categoryRef && categoryRef.get()
      );

      const data = await Promise.all(categoryReads).then((docs: any) =>
        docs.map((doc: any) => doc.data())
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
            <CollectionCard collection={item} type="categories" key={item.id} />
          ))
        : null}
    </React.Fragment>
  );
};

export default ProfileCategories;
