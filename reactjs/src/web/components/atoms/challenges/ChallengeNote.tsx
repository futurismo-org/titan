import React from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { secondaryColor, brandWhite } from '~/lib/theme';
import { formatDatetimeShort } from '~/lib/moment';
import {
  NOTE_TYPE_JOIN,
  NOTE_TYPE_OPEN,
  NOTE_TYPE_CLOSE
} from '~/constants/note';

// Record - 記録
// Reset - リセット
// Topic - トピック投稿
// Text success - テキスト投稿(達成)
// Text analysis - テキスト投稿(分析)
// Text - テキスト投稿
// Media -メディア投稿

// Announce - 参加・大会開始・大会終了
export const ChallengeNoteJoin = (props: any) => {
  const { startedAt } = props.data;
  return (
    <TimelineItem
      key="1"
      dateText={`${formatDatetimeShort(startedAt)} - Joined`}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会に参加しました。</p>
    </TimelineItem>
  );
};

export const ChallengeNoteOpen = (props: any) => {
  const openedAt: Date = props.data.openedAt;
  return (
    <TimelineItem
      key="2"
      dateText={formatDatetimeShort(openedAt) + ' - Opened'}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会がスタートしました。</p>
    </TimelineItem>
  );
};

export const ChallengeNoteClose = (props: any) => {
  const closedAt: Date = props.data.closedAt;

  return (
    <TimelineItem
      key="3"
      dateText={formatDatetimeShort(closedAt) + '- Closed'}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジ大会が終了しました。</p>
    </TimelineItem>
  );
};

const componentMap = new Map([
  [NOTE_TYPE_JOIN, (data: any) => <ChallengeNoteJoin data={data} />],
  [NOTE_TYPE_OPEN, (data: any) => <ChallengeNoteOpen data={data} />],
  [NOTE_TYPE_CLOSE, (data: any) => <ChallengeNoteClose data={data} />]
]);

const ChallengeNote = (props: any) => {
  const { type, data } = props;

  const noteFactory = componentMap.get(type);

  return noteFactory!(data);
};

export default ChallengeNote;
