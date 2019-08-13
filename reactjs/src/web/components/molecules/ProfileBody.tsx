import React from 'react';

import { Grid } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import CollectionCard from '../atoms/CollectionCard';
import theme from '~/lib/theme';
import ProfileCategories from './ProfileCategories';

const ProfileBody = (props: any) => {
  const { user } = props;

  return (
    <Paper>
      <Title text="参加中のチャレンジ" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {user.currentChallenges &&
          user.currentChallenges.map((item: any) => (
            <CollectionCard collection={item} type="challenges" key={item.id} />
          ))}
      </Grid>
      <Title text="参加中のカテゴリ" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {user.categories && <ProfileCategories refs={user.categories} />}
      </Grid>
      <Title text="過去のチャレンジ実績" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      ></Grid>
    </Paper>
  );
};

export default ProfileBody;
