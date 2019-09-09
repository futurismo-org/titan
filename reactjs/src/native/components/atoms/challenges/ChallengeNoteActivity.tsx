import React, { useState } from 'react';
import { withRouter } from 'react-router-native';
import { Activity, updateStyle } from 'expo-activity-feed';
import { View, Text, Textarea } from 'native-base';
import AlertPro from 'react-native-alert-pro';
import RadioForm from 'react-native-simple-radio-button';
import { Linking } from 'react-native';
import { dummyImage } from '~/lib/post';
import moment from '~/lib/moment';
import {
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_MESSAGE_OPEN,
  POST_MESSAGE_CLOSE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS,
  POST_TYPE_NOTE,
  POST_TYPE_OBJECTIVE,
  POST_TYPE_TOPIC
} from '~/constants/post';
import {
  secondaryColor,
  brandWhite,
  brandGray,
  primaryColor
} from '~/lib/theme';
import { isChallengeOpened, isChallengeClosed } from '~/lib/challenge';
import { successToastWithNoRedirect } from '../Toast';
import MarkdownView from '../MarkdownView';

updateStyle('userBar', {
  username: {
    fontSize: 14
  }
});

const ActivityFooter = withRouter((props: any) => {
  const {
    updateHandler,
    deleteHandler,
    isMyProfile,
    history,
    location,
    setEdit,
    edit,
    text
  } = props;

  const [alert, setAlert] = useState();

  const handleOpen = () => {
    alert.open();
  };

  const handleClose = () => {
    alert.close();
  };

  const handleDelete = () =>
    deleteHandler()
      .then(() => {
        const path = location.pathname;
        history.push('/');
        history.push(path);
      })
      .then(() => successToastWithNoRedirect('ノートを削除しました。'))
      .finally(handleClose);

  const onTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    Linking.openURL(url);
  };

  return (
    <React.Fragment>
      {isMyProfile && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          {edit && (
            <Text
              style={{ color: brandGray, fontSize: 14, marginRight: 10 }}
              onPress={() => setEdit(false)}
            >
              キャンセル
            </Text>
          )}
          {edit ? (
            <Text
              style={{ color: brandGray, fontSize: 14 }}
              onPress={updateHandler}
            >
              保存
            </Text>
          ) : (
            <React.Fragment>
              <Text
                style={{
                  color: brandGray,
                  fontSize: 14,
                  marginRight: 10
                }}
                onPress={onTweet}
              >
                Tweet
              </Text>
              <Text
                style={{ color: brandGray, fontSize: 14 }}
                onPress={() => setEdit(true)}
              >
                編集
              </Text>
            </React.Fragment>
          )}
          {!edit && (
            <View style={{ marginLeft: 10 }}>
              <Text
                onPress={handleOpen}
                style={{ color: brandGray, fontSize: 14 }}
              >
                削除
              </Text>
              <AlertPro
                ref={(ref: any) => setAlert(ref)}
                onConfirm={handleDelete}
                onCancel={handleClose}
                title="ノートを削除しますか？"
                textCancel="いいえ"
                textConfirm="はい"
              />
            </View>
          )}
        </View>
      )}
    </React.Fragment>
  );
});

const ChallengeNoteActivity = (props: any) => {
  const {
    data,
    history,
    updateHandler,
    deleteHandler,
    isMyProfile,
    selected
  } = props;

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(data.text);
  const [type, setType] = useState(data.type);

  if (selected === POST_TYPE_SUCCESS && data.type !== POST_TYPE_SUCCESS) {
    return null;
  }
  if (selected === POST_TYPE_ANALYSIS && data.type !== POST_TYPE_ANALYSIS) {
    return null;
  }

  const activity = {
    actor: {
      data: {
        name: data.message,
        profileImage: data.dummyImage
      }
    },
    object: data.text,
    verb: data.type,
    time: moment(data.timestamp).toDate()
  };
  const path = data.path;

  const isNote = (type: string) =>
    type === POST_TYPE_SUCCESS ||
    type === POST_TYPE_ANALYSIS ||
    type === POST_TYPE_NOTE;

  const hasContent = (type: string) =>
    isNote(type) || type === POST_TYPE_OBJECTIVE || type === POST_TYPE_TOPIC;

  const handleUpdate = () => {
    updateHandler({ text, type })
      .then(() => setEdit(false))
      .then(() => successToastWithNoRedirect('ノートを更新しました。'));
  };

  const radioProps = [
    { label: 'メモ', value: 0 },
    { label: '達成メモ', value: 1 },
    { label: '分析メモ', value: 2 }
  ];

  const radioList = [POST_TYPE_NOTE, POST_TYPE_SUCCESS, POST_TYPE_ANALYSIS];
  const radioMap = new Map([
    [POST_TYPE_NOTE, 0],
    [POST_TYPE_SUCCESS, 1],
    [POST_TYPE_ANALYSIS, 2]
  ]);

  const onTypeChange = (value: number) => {
    setType(radioList[value]);
  };

  return (
    <React.Fragment>
      <Activity
        activity={activity}
        onPress={() => path && history.push(path)}
        Content={() =>
          hasContent(data.type) ? (
            <View style={{ marginLeft: 20 }}>
              <MarkdownView text={text} />
            </View>
          ) : null
        }
        Footer={() =>
          isNote(data.type) && (
            <ActivityFooter
              updateHandler={handleUpdate}
              deleteHandler={deleteHandler}
              isMyProfile={isMyProfile}
              type={type}
              edit={edit}
              setEdit={setEdit}
              text={text}
            />
          )
        }
      />
      {edit && (
        <React.Fragment>
          <Textarea
            value={text}
            bordered
            rowSpan={6}
            onChangeText={text => setText(text)}
          />
          <RadioForm
            buttonSize={10}
            radio_props={radioProps}
            initial={radioMap.get(type)}
            buttonColor={primaryColor}
            selectedButtonColor={primaryColor}
            animation
            formHorizontal
            onPress={onTypeChange}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export const ChallengeNoteOpenActivity = (props: any) => {
  const { challenge } = props;

  if (!isChallengeOpened(challenge.openedAt.toDate())) {
    return null;
  }

  const activity = {
    actor: {
      data: {
        name: POST_MESSAGE_OPEN,
        profileImage: dummyImage(secondaryColor, brandWhite, 'open')
      }
    },
    verb: POST_TYPE_OPEN,
    time: challenge.openedAt.toDate().toISOString()
  };

  return <Activity activity={activity} />;
};

export const ChallengeNoteCloseActivity = (props: any) => {
  const { challenge } = props;

  if (!isChallengeClosed(challenge.closedAt.toDate())) {
    return null;
  }

  const activity = {
    actor: {
      data: {
        name: POST_MESSAGE_CLOSE,
        profileImage: dummyImage(secondaryColor, brandWhite, 'close')
      }
    },
    verb: POST_TYPE_CLOSE,
    time: challenge.closedAt.toDate().toISOString()
  };

  return <Activity activity={activity} />;
};

export default withRouter(ChallengeNoteActivity);
