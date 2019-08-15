import React from 'react';
import Title from '../atoms/Title';

const ProfileBody = (props: any) => {
  return (
    <React.Fragment>
      <Title text="参加中のチャレンジ" />
      <Title text="所属カテゴリ" />
      <Title text="過去のチャレンジ実績" />
    </React.Fragment>
  );
};

export default ProfileBody;
