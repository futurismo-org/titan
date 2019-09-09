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
  brandPurple,
  brandAqua
} from '~/lib/theme';
import { formatDatetimeShort } from '~/lib/moment';
import {
  POST_TYPE_JOIN,
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_TOPIC,
  POST_TYPE_NOTE,
  POST_TYPE_ANALYSIS,
  POST_TYPE_SUCCESS,
  POST_TYPE_OBJECTIVE,
  POST_MESSAGE_JOIN,
  POST_MESSAGE_OPEN,
  POST_MESSAGE_CLOSE,
  POST_MESSAGE_RECORD,
  POST_MESSAGE_RESET,
  POST_MESSAGE_TOPIC,
  POST_MESSAGE_OBJECTIVE
} from '~/constants/post';

import TextFieldView from '../TextFieldView';
import Flag from '~/web/containers/FlagContainer';

const ChallengeNoteJoin = (props: any) => {
  const { timestamp } = props.data;
  return (
    <TimelineItem
      key={POST_MESSAGE_JOIN}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: secondaryColor, color: brandWhite }}
    >
      <p>{POST_MESSAGE_JOIN}</p>
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
      <p>{POST_MESSAGE_OPEN}</p>
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
      <p>{POST_MESSAGE_CLOSE}</p>
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
      <p>
        {POST_MESSAGE_RECORD} ({daysString})
      </p>
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
      <p>{POST_MESSAGE_RESET}</p>
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
      <p>{POST_MESSAGE_TOPIC}</p>
      <Link to={path}>{title}</Link>
    </TimelineItem>
  );
};

const ChallengeNoteObjective = (props: any) => {
  const { data } = props;
  const { timestamp, what } = data;

  return (
    <TimelineItem
      key={POST_TYPE_OBJECTIVE}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: brandAqua, color: brandDark }}
    >
      <p>{POST_MESSAGE_OBJECTIVE}</p>
      <p>{what}</p>
    </TimelineItem>
  );
};

const ChallengeNoteMemo = (props: any) => {
  const { data, backgroundColor, color } = props;
  const {
    timestamp,
    text,
    noteId,
    challengeId,
    type,
    isMyProfile,
    updateHandler,
    deleteHandler
  } = data;

  const [edit, setEdit] = useState(false);
  const [buffer, setBuffer] = useState(text);
  const [label, setLabel] = useState(type);

  const onBufferChange = (e: any) => {
    e.preventDefault();
    setBuffer(e.target.value);
  };

  const onLabelChange = (e: any) => {
    e.preventDefault();
    setLabel(e.target.value);
  };

  const onSave = () => {
    updateHandler({ text: buffer, type: label }).then(
      () => window.location.reload() // eslint-disable-line
    );
  };

  const onDelete = () => {
    /* eslint-disable */
    if (window.confirm('本当に削除しますか？')) {
      deleteHandler()
        .then(() => window.alert('削除しました。'))
        .then(() => window.location.reload());
    }
    /* eslint-enable */
  };

  const onTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${buffer}`;
    window.open(url, '_blank'); // eslint-disable-line
  };

  const renderText = () => (
    <React.Fragment>
      <TextFieldView text={buffer} />
      {isMyProfile ? (
        <div style={{ textAlign: 'right' }}>
          <p>
            <span
              style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
              role="button"
              onClick={onTweet}
            >
              Tweet
            </span>{' '}
            <span
              style={{ cursor: 'pointer' }}
              role="button"
              onClick={() => setEdit(true)}
            >
              編集
            </span>{' '}
            <span
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={onDelete}
            >
              削除
            </span>
          </p>
        </div>
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
          value={POST_TYPE_NOTE}
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
          onClick={() => setEdit(false)}
        >
          キャンセル
        </span>{' '}
        <span
          style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
          role="button"
          onClick={onSave}
        >
          保存
        </span>
      </p>
    </React.Fragment>
  );

  return (
    <TimelineItem
      key={type}
      dateText={formatDatetimeShort(timestamp)}
      dateInnerStyle={{ background: backgroundColor, color }}
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
  [POST_TYPE_NOTE, (data: any) => <ChallengeNoteDefault data={data} />],
  [POST_TYPE_SUCCESS, (data: any) => <ChallengeNoteSuccess data={data} />],
  [POST_TYPE_ANALYSIS, (data: any) => <ChallengeNoteAnalysis data={data} />],
  [POST_TYPE_OBJECTIVE, (data: any) => <ChallengeNoteObjective data={data} />]
]);

const ChallengeNote = (props: any) => {
  const { type, data, isMyProfile, updateHandler, deleteHandler } = props;

  const noteFactory = componentMap.get(type);

  const params = {
    ...data,
    isMyProfile,
    updateHandler,
    deleteHandler
  };

  return noteFactory!(params);
};

export default ChallengeNote;
