import React from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import Flag from '~/web/containers/FlagContainer';

import {
  secondaryColor,
  brandWhite,
  brandSuccess,
  brandWarning,
  brandPink,
  brandDarkBlue,
  brandYellow,
  brandDark,
  brandPurple
} from '~/lib/theme';
import { formatDatetimeShort } from '~/lib/moment';
import {
  NOTE_TYPE_JOIN,
  NOTE_TYPE_OPEN,
  NOTE_TYPE_CLOSE,
  NOTE_TYPE_RECORD,
  NOTE_TYPE_RESET,
  NOTE_TYPE_TOPIC,
  NOTE_TYPE_DEFAULT,
  NOTE_TYPE_ANALYSIS,
  NOTE_TYPE_SUCCESS
} from '~/constants/note';
import TextFieldView from '../../atoms/TextFieldView';
import UserAvatar from '../../atoms/UserAvatar';

const TimelineItemHeadline = (props: any) => {
  const { headline, photoURL, userId } = props;
  return (
    <Grid container direction="row" justify="flex-start">
      <Grid item>
        <UserAvatar photoURL={photoURL} userId={userId} />
      </Grid>
      <Grid item>
        <p style={{ lineHeight: 3, marginLeft: 10 }}>{headline}</p>
      </Grid>
    </Grid>
  );
};

const TimelineItemFooter = ({ name }: any) => <p>Posted by {name}</p>;

const ChallengeTimelineItemJoin = (props: any) => {
  const { startedAt, userId, userName, userPhotoURL } = props.data;
  return (
    <TimelineItem
      key={NOTE_TYPE_JOIN}
      dateText={formatDatetimeShort(startedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <TimelineItemHeadline
        headline={`${userName}さんが参加しました。`}
        photoURL={userPhotoURL}
        userId={userId}
      />
    </TimelineItem>
  );
};

const ChallengeTimelineItemOpen = (props: any) => {
  const openedAt: Date = props.data.openedAt;
  return (
    <TimelineItem
      key={NOTE_TYPE_OPEN}
      dateText={formatDatetimeShort(openedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジがスタートしました。</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemClose = (props: any) => {
  const closedAt: Date = props.data.closedAt;

  return (
    <TimelineItem
      key={NOTE_TYPE_CLOSE}
      dateText={formatDatetimeShort(closedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジが終了しました。</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemRecord = (props: any) => {
  const { data } = props;
  const { timestamp, days, userId, userName, userPhotoURL } = data;

  const daysString = days === 0 || days === 1 ? `${days}day` : `${days}days`;

  return (
    <TimelineItem
      key={NOTE_TYPE_RECORD}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandSuccess, color: brandWhite }}
    >
      <TimelineItemHeadline
        headline={`記録を投稿しました。(${daysString})`}
        photoURL={userPhotoURL}
        userId={userId}
      />
      <TimelineItemFooter name={userName} />
    </TimelineItem>
  );
};

const ChallengeTimelineItemReset = (props: any) => {
  const { data } = props;
  const { timestamp, userName, userPhotoURL, userId } = data;

  return (
    <TimelineItem
      key={NOTE_TYPE_RESET}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandWarning, color: brandWhite }}
    >
      <TimelineItemHeadline
        headline="リセットしました。"
        photoURL={userPhotoURL}
        userId={userId}
      />
      <TimelineItemFooter name={userName} />
    </TimelineItem>
  );
};

const ChallengeTimelineItemTopic = (props: any) => {
  const { data } = props;
  const { timestamp, path, title, userName, userPhotoURL, userId } = data;

  return (
    <TimelineItem
      key={NOTE_TYPE_TOPIC}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandPurple, color: brandWhite }}
    >
      <TimelineItemHeadline
        headline="トピックが投稿されました。"
        photoURL={userPhotoURL}
        userId={userId}
      />
      <Link to={path}>{title}</Link>
      <p>Posted by {userName}</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemMemo = (props: any) => {
  const { data, backgroundColor, color } = props;
  const {
    timestamp,
    text,
    type,
    userPhotoURL,
    userId,
    userName,
    noteId,
    challengeId
  } = data;

  return (
    <TimelineItem
      key={type}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: backgroundColor, color }}
    >
      <TimelineItemHeadline
        headline="ノートが投稿されました。"
        photoURL={userPhotoURL}
        userId={userId}
      />
      <TextFieldView text={text} />
      <Flag note={{ challengeId, noteId }} />
      <p>Posted by {userName}</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemDefault = (props: any) => {
  return (
    <ChallengeTimelineItemMemo
      backgoundColor={brandPink}
      color={brandWhite}
      {...props}
    />
  );
};

const ChallengeTimelineItemSuccess = (props: any) => {
  return (
    <ChallengeTimelineItemMemo
      backgroundColor={brandYellow}
      color={brandDark}
      {...props}
    />
  );
};

const ChallengeTimelineItemAnalysis = (props: any) => {
  return (
    <ChallengeTimelineItemMemo
      backgroundColor={brandDarkBlue}
      color={brandWhite}
      {...props}
    />
  );
};

const componentMap = new Map([
  [NOTE_TYPE_JOIN, (data: any) => <ChallengeTimelineItemJoin data={data} />],
  [NOTE_TYPE_OPEN, (data: any) => <ChallengeTimelineItemOpen data={data} />],
  [NOTE_TYPE_CLOSE, (data: any) => <ChallengeTimelineItemClose data={data} />],
  [
    NOTE_TYPE_RECORD,
    (data: any) => <ChallengeTimelineItemRecord data={data} />
  ],
  [NOTE_TYPE_RESET, (data: any) => <ChallengeTimelineItemReset data={data} />],
  [NOTE_TYPE_TOPIC, (data: any) => <ChallengeTimelineItemTopic data={data} />],
  [
    NOTE_TYPE_DEFAULT,
    (data: any) => <ChallengeTimelineItemDefault data={data} />
  ],
  [
    NOTE_TYPE_SUCCESS,
    (data: any) => <ChallengeTimelineItemSuccess data={data} />
  ],
  [
    NOTE_TYPE_ANALYSIS,
    (data: any) => <ChallengeTimelineItemAnalysis data={data} />
  ]
]);

const ChallengeTimelineItem = (props: any) => {
  const { type, data } = props;

  const noteFactory = componentMap.get(type);

  return noteFactory!(data);
};

export default ChallengeTimelineItem;
