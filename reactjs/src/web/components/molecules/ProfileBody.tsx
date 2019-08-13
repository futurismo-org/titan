import React from 'react';

import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';

const ProfileBody = (props: any) => {
  const { user } = props;

  return (
    <Paper>
      <Title text="参加中のチャレンジ" />
      <Title text="参加中のカテゴリ" />
      <Title text="過去のチャレンジ実績" />
    </Paper>
  );
};

export default ProfileBody;
