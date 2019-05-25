import React from 'react';

const CategoryHeader = props => {
  const { category } = props;

  return (
    <div>
      <h1>{category.title}</h1>
      <p>{category.discription}</p>
    </div>
  );
};

export default CategoryHeader;
