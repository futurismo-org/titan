import React, { useEffect } from 'react';

import { Follow } from 'react-twitter-widgets';
import { Grid, Icon } from '@material-ui/core';
import styled from 'styled-components';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';
import UserAvatar from '../atoms/UserAvatar';

import MuteButton from '~/web/containers/MuteButtonContainer';
import BlockButton from '~/web/containers/BlockButtonContainer';
import { twitterColor } from '~/lib/theme';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import { TITAN_TWITTER_URL } from '~/constants/appInfo';

const ProfileContainer = styled.div`
  text-align: center;
`;

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isMyProfile,
    isLogin,
    myUserId,
    fetchBlockingUsers,
    blocked
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchUserWithShortId, myUserId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading &&
        user &&
        (blocked ? (
          <Paper>
            <Title text="表示をブロックしました" />
            <p>
              あなたはこのユーザからブロックされているため、プロフィールを閲覧できません。
            </p>
          </Paper>
        ) : (
          <Paper>
            <Grid container justify="center">
              <Grid item>
                <ProfileContainer>
                  <UserAvatar
                    photoURL={user.photoURL}
                    userId={user.shortId}
                    xlarge
                  />
                  <div>
                    <h2>{user.displayName}</h2>
                  </div>
                  {!!user.twitterUsername && (
                    <NoStyledExternalLink href={TITAN_TWITTER_URL}>
                      <Icon
                        className="fab fa-twitter"
                        style={{ color: twitterColor }}
                      />
                    </NoStyledExternalLink>
                  )}
                  {user.introduction && <p>{user.introduction}</p>}
                  {isLogin && !isMyProfile && (
                    <React.Fragment>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <MuteButton user={user} />
                        <BlockButton user={user} />
                      </div>
                    </React.Fragment>
                  )}
                </ProfileContainer>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </React.Fragment>
  );
};

export default Profile;
