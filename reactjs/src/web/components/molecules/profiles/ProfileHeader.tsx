import React from 'react';

import { Grid, Icon } from '@material-ui/core';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';

import UserAvatar from '../../atoms/UserAvatar';
import MuteButton from '~/web/containers/MuteButtonContainer';
import BlockButton from '~/web/containers/BlockButtonContainer';
import theme, { twitterColor, brandGray, brandWhite } from '~/lib/theme';
import NoStyledExternalLink from '../../atoms/NoStyledExternalLink';
import PostButton from '../../atoms/PostButton';
import { formatYearDate } from '~/lib/moment';
import { getRandomImageURL, getTwitterProfileURL } from '~/lib/url';
import TotalScoreBoard from '~/web/containers/TotalScoreBoardContainer';
import Flag from '~/web/containers/FlagContainer';
import TextFieldView from '../../atoms/TextFieldView';

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

const ProfileHeader = (props: any) => {
  const { user, isLogin, isMyProfile } = props;

  return (
    <React.Fragment>
      <MainFeaturedPost>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            transform: 'translate3d(0, 50%, 0)'
          }}
        >
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} xlarge />
        </div>
      </MainFeaturedPost>
      <Grid
        container
        justify="center"
        style={{ padding: 20, backgroundColor: brandWhite }}
      >
        <Grid item md={12}>
          <ProfileContent>
            <div>
              <h2>{user.displayName}</h2>
            </div>
            <TotalScoreBoard userShortId={user.shortId} />
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              {!!user.introduction && (
                <TextFieldView text={user.introduction} />
              )}
            </div>
            <div>
              {!!user.twitterUsername && (
                <NoStyledExternalLink
                  href={getTwitterProfileURL(user.twitterUsername)}
                >
                  <Icon
                    className="fab fa-twitter"
                    style={{ color: twitterColor }}
                  />
                </NoStyledExternalLink>
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
          </ProfileContent>
        </Grid>
        {isLogin && isMyProfile && (
          <Grid item md={12}>
            <div style={{ textAlign: 'center' }}>
              <PostButton
                to="/settings"
                type="button"
                text="プロフィールを編集"
              />
            </div>
          </Grid>
        )}
        {!isMyProfile && (
          <Grid item md={12}>
            <Flag profile={user} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default ProfileHeader;
