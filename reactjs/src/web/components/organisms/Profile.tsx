import React, { useEffect } from 'react';

import { Grid, Icon } from '@material-ui/core';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import UserAvatar from '../atoms/UserAvatar';

import MuteButton from '~/web/containers/MuteButtonContainer';
import BlockButton from '~/web/containers/BlockButtonContainer';
import theme, { twitterColor, brandGray } from '~/lib/theme';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import { TITAN_TWITTER_URL } from '~/constants/appInfo';
import PostButton from '../atoms/PostButton';
import { formatYearDate } from '~/lib/moment';
import { getRandomImageURL } from '~/lib/url';

const ProfileContent = styled.div`
  text-align: center;
`;

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(8)}px;
    background-image: url(${getRandomImageURL()});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
` as React.ComponentType<PaperProps>;

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
          <React.Fragment>
            <MainFeaturedPost>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  transform: 'translate3d(0, 50%, 0)'
                }}
              >
                <UserAvatar
                  photoURL={user.photoURL}
                  userId={user.shortId}
                  xlarge
                />
              </div>
            </MainFeaturedPost>
            <Grid container justify="center" style={{ padding: 20 }}>
              <Grid item>
                <ProfileContent>
                  <div>
                    <h2>{user.displayName}</h2>
                  </div>
                  <div>
                    {!!user.twitterUsername && (
                      <NoStyledExternalLink href={TITAN_TWITTER_URL}>
                        <Icon
                          className="fab fa-twitter"
                          style={{ color: twitterColor }}
                        />
                      </NoStyledExternalLink>
                    )}
                  </div>
                  <div>
                    {!!user.introduction && (
                      <div>
                        <p>{user.introduction}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    {isLogin && !isMyProfile && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <MuteButton user={user} />
                        <BlockButton user={user} />
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      color: brandGray
                    }}
                  >
                    <p>{`登録日 ${formatYearDate(user.createdAt.toDate())}`}</p>
                    <p style={{ marginLeft: 10 }}>{`最終更新日 ${formatYearDate(
                      user.updatedAt.toDate()
                    )}`}</p>
                  </div>
                </ProfileContent>

                <div style={{ textAlign: 'right' }}>
                  <PostButton
                    to="/settings"
                    type="button"
                    text="プロフィールを編集"
                  />
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Profile;
