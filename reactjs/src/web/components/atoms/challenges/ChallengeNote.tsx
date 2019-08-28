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
  POST_TYPE_JOIN,
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_TOPIC,
  POST_TYPE_DEFAULT,
  POST_TYPE_ANALYSIS,
  POST_TYPE_SUCCESS
} from '~/constants/post';

import { update, remove } from '~/lib/firebase';
import TextFieldView from '../TextFieldView';
import Flag from '~/web/containers/FlagContainer';

const ChallengeNoteJoin = (props: any) => {
  const { createdAt } = props.data;
  return (
    <TimelineItem
      key={POST_TYPE_JOIN}
      dateText={formatDatetimeShort(createdAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジに参加しました。</p>
    </TimelineItem>
  );
};

const ChallengeNoteOpen = (props: any) => {
  const openedAt: Date = props.data.openedAt;
  return (
    <TimelineItem
      key={POST_TYPE_OPEN}
      dateText={formatDatetimeShort(openedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジがスタートしました。</p>
    </TimelineItem>
  );
};

const ChallengeNoteClose = (props: any) => {
  const closedAt: Date = props.data.closedAt;

  return (
    <TimelineItem
      key={POST_TYPE_CLOSE}
      dateText={formatDatetimeShort(closedAt)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>チャレンジが終了しました。</p>
    </TimelineItem>
  );
};

const ChallengeNoteRecord = (props: any) => {
  const { data } = props;
  const { timestamp, days } = data;

  const daysString = days === 0 || days === 1 ? `${days}day` : `${days}days`;

  return (
    <TimelineItem
      key={POST_TYPE_RECORD}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandSuccess, color: brandWhite }}
    >
      <p>記録を投稿しました。({daysString})</p>
    </TimelineItem>
  );
};

const ChallengeNoteReset = (props: any) => {
  const { data } = props;
  const { timestamp } = data;

  return (
    <TimelineItem
      key={POST_TYPE_RESET}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandWarning, color: brandWhite }}
    >
      <p>リセットしました。</p>
    </TimelineItem>
  );
};

const ChallengeNoteTopic = (props: any) => {
  const { data } = props;
  const { timestamp, path, title } = data;

  return (
    <TimelineItem
      key={POST_TYPE_TOPIC}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandPurple, color: brandWhite }}
    >
      <p>トピックを投稿しました。</p>
      <Link to={path}>{title}</Link>
    </TimelineItem>
  );
};

const ChallengeNoteMemo = (props: any) => {
  const { data, backgroundColor, color } = props;
  const { timestamp, text, noteId, challengeId, type, isMyProfile } = data;

  const [edit, setEdit] = useState(false);
  const [buffer, setBuffer] = useState(text);
  const [label, setLabel] = useState(type);
  const [background, setBackground] = useState(backgroundColor);
  const [textColor, setTextColor] = useState(color);

  const onBufferChange = (e: any) => {
    e.preventDefault();
    setBuffer(e.target.value);
  };

  const onLabelChange = (e: any) => {
    e.preventDefault();
    setLabel(e.target.value);
  };

  const resourceId = `/challenges/${challengeId}/notes/${noteId}`;

  const onSave = () => {
    const data = {
      text: buffer,
      type: label,
      updatedAt: new Date()
    };

    update(resourceId, data)
      .then(() => {
        if (label === POST_TYPE_DEFAULT) {
          setBackground(brandPink);
          setTextColor(brandWhite);
        } else if (label === POST_TYPE_SUCCESS) {
          setBackground(brandYellow);
          setTextColor(brandDark);
        } else if (label === POST_TYPE_ANALYSIS) {
          setBackground(brandDarkBlue);
          setTextColor(brandWhite);
        }
      })
      .then(() => setEdit(false));
  };

  const onDelete = () => {
    /* eslint-disable */
    if (window.confirm('本当に削除しますか？')) {
      remove(resourceId).then(() => window.location.reload());
    }
    /* eslint-enable */
  };

  const renderText = () => (
    <React.Fragment>
      <TextFieldView text={buffer} />
      {isMyProfile ? (
        <p>
          <span
            style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
            role="button"
            onClick={() => setEdit(true)}
          >
            編集
          </span>{' '}
          <span
            role="button"
            style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
            onClick={onDelete}
          >
            削除
          </span>
        </p>
      ) : (
        <Flag note={{ challengeId, noteId }} />
      )}
    </React.Fragment>
  );

  const renderEdit = () => (
    <React.Fragment>
      <TextField
        value={buffer}
        variant="outlined"
        margin="normal"
        required
        id="note"
        label="ノート"
        fullWidth
        multiline
        onChange={onBufferChange}
      />
      <RadioGroup
        aria-label="label"
        name="ラベル"
        value={label}
        onChange={onLabelChange}
        row
      >
        <FormControlLabel
          value={POST_TYPE_DEFAULT}
          control={<Radio color="primary" />}
          label="メモ"
        />
        <FormControlLabel
          value={POST_TYPE_SUCCESS}
          control={<Radio color="primary" />}
          label="達成記録"
        />
        <FormControlLabel
          value={POST_TYPE_ANALYSIS}
          control={<Radio color="primary" />}
          label="分析記録"
        />
      </RadioGroup>
      <p>
        <span
          style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
          role="button"
          onClick={onSave}
        >
          保存
        </span>{' '}
      </p>
    </React.Fragment>
  );

  return (
    <TimelineItem
      key={type}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background, color: textColor }}
    >
      {edit ? renderEdit() : renderText()}
    </TimelineItem>
  );
};

const ChallengeNoteDefault = (props: any) => {
  return (
    <ChallengeNoteMemo
      backgoundColor={brandPink}
      color={brandWhite}
      {...props}
    />
  );
};

const ChallengeNoteSuccess = (props: any) => {
  return (
    <ChallengeNoteMemo
      backgroundColor={brandYellow}
      color={brandDark}
      {...props}
    />
  );
};

const ChallengeNoteAnalysis = (props: any) => {
  return (
    <ChallengeNoteMemo
      backgroundColor={brandDarkBlue}
      color={brandWhite}
      {...props}
    />
  );
};

const componentMap = new Map([
  [POST_TYPE_JOIN, (data: any) => <ChallengeNoteJoin data={data} />],
  [POST_TYPE_OPEN, (data: any) => <ChallengeNoteOpen data={data} />],
  [POST_TYPE_CLOSE, (data: any) => <ChallengeNoteClose data={data} />],
  [POST_TYPE_RECORD, (data: any) => <ChallengeNoteRecord data={data} />],
  [POST_TYPE_RESET, (data: any) => <ChallengeNoteReset data={data} />],
  [POST_TYPE_TOPIC, (data: any) => <ChallengeNoteTopic data={data} />],
  [POST_TYPE_DEFAULT, (data: any) => <ChallengeNoteDefault data={data} />],
  [POST_TYPE_SUCCESS, (data: any) => <ChallengeNoteSuccess data={data} />],
  [POST_TYPE_ANALYSIS, (data: any) => <ChallengeNoteAnalysis data={data} />]
]);

const ChallengeNote = (props: any) => {
  const { type, data, isMyProfile } = props;

  const noteFactory = componentMap.get(type);

  const params = {
    ...data,
    isMyProfile
  };

  return noteFactory!(params);
};

export default ChallengeNote;
