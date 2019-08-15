import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import CollectionCard from '~/web/containers/CollectionCardContainer';
import theme from '~/lib/theme';
import ProfileCategories from './ProfileCategories';
import ProfileChallenges from '~/web/containers/ProfileChallengesContainer';

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
        {!loading && currentChallenges && currentChallenges.length !== 0 ? (
          currentChallenges.map((item: any) => (
            <CollectionCard collection={item} type="challenges" key={item.id} />
          ))
        ) : (
          <p style={{ marginLeft: 20 }}>
            現在、参加中のチャレンジはありません。
          </p>
        )}
      </Grid>
      <Title text="所属カテゴリの記録" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {!loading && categories && categories.length !== 0 ? (
          <ProfileCategories
            userShortId={userShortId}
            refs={categories.map((category: any) => category.ref)}
          />
        ) : (
          <p style={{ marginLeft: 20 }}>
            現在、所属しているカテゴリはありません。
          </p>
        )}
      </Grid>
      <Title text="過去のチャレンジ実績" />
      <Grid
        container
        spacing={4}
        style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}
      >
        {!loading && pastChallenges && pastChallenges.length !== 0 ? (
          <ProfileChallenges
            challenges={pastChallenges}
            userShortId={userShortId}
          />
        ) : (
          <p style={{ marginLeft: 20 }}>
            過去に参加したチャレンジはありません。
          </p>
        )}
      </Grid>
    </Paper>
  );
};

export default ProfileBody;
