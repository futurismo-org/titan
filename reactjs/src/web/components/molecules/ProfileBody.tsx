import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import CollectionCard from '../atoms/CollectionCard';
import theme from '~/lib/theme';
import ProfileCategories from './ProfileCategories';
import { isChallengeClosed } from '~/lib/challenge';
import ProfileChallenges from './ProfileChallenges';

const ProfileBody = (props: any) => {
  const {
    currentChallenges,
    pastChallenges,
    categories,
    fetchProfileChallenges,
    fetchProfileCategories,
    userShortId,
    loading
  } = props;

  useEffect(() => {
    fetchProfileChallenges(userShortId);
    fetchProfileCategories(userShortId);
  }, [fetchProfileCategories, fetchProfileChallenges, userShortId]);

  return (
    <Paper>
      <Title text="参加中のチャレンジ" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {!loading &&
          currentChallenges &&
          currentChallenges.map((item: any) => (
            <CollectionCard collection={item} type="challenges" key={item.id} />
          ))}
      </Grid>
      <Title text="所属カテゴリ" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {!loading && categories && (
          <ProfileCategories
            refs={categories.map((category: any) => category.ref)}
          />
        )}
      </Grid>
      <Title text="過去のチャレンジ実績" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {!loading && pastChallenges && (
          <ProfileChallenges challenges={pastChallenges} />
        )}
      </Grid>
    </Paper>
  );
};

export default ProfileBody;
