import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { Link } from 'react-router-dom';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

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

const ChallengeTimelineItemJoin = (props: any) => {
  const { startedAt } = props.data;
  return (
    <TimelineItem
      key={NOTE_TYPE_JOIN}
      dateText={formatDatetimeShort(startedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会に参加しました。</p>
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
      <p>チャレンジ大会がスタートしました。</p>
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
      <p>チャレンジ大会が終了しました。</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemRecord = (props: any) => {
  const { data } = props;
  const { timestamp, days } = data;

  const daysString = days === 0 || days === 1 ? `${days}day` : `${days}days`;

  return (
    <TimelineItem
      key={NOTE_TYPE_RECORD}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandSuccess, color: brandWhite }}
    >
      <p>記録を投稿しました。({daysString})</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemReset = (props: any) => {
  const { data } = props;
  const { timestamp } = data;

  return (
    <TimelineItem
      key={NOTE_TYPE_RESET}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandWarning, color: brandWhite }}
    >
      <p>リセットしました。</p>
    </TimelineItem>
  );
};

const ChallengeTimelineItemTopic = (props: any) => {
  const { data } = props;
  const { timestamp, path, title } = data;

  return (
    <TimelineItem
      key={NOTE_TYPE_TOPIC}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandPurple, color: brandWhite }}
    >
      <p>トピックを投稿しました。</p>
      <Link to={path}>{title}</Link>
    </TimelineItem>
  );
};

const ChallengeTimelineItemMemo = (props: any) => {
  const { data, backgroundColor, color } = props;
  const { timestamp, text, noteId, challengeId, type } = data;

  return (
    <TimelineItem
      key={type}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: backgroundColor, color }}
    >
      <TextFieldView text={text} />
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
