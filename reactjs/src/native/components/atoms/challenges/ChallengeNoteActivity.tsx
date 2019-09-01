import React, { useState } from 'react';
import { withRouter } from 'react-router-native';
import { Activity, updateStyle } from 'expo-activity-feed';
import { View, Text, Textarea } from 'native-base';
import AlertPro from 'react-native-alert-pro';
import { dummyImage } from '~/lib/post';
import moment from '~/lib/moment';
import {
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_MESSAGE_OPEN,
  POST_MESSAGE_CLOSE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS,
  POST_TYPE_NOTE
} from '~/constants/post';
import { secondaryColor, brandWhite, brandGray } from '~/lib/theme';
import { isChallengeOpened, isChallengeClosed } from '~/lib/challenge';
import { successToastWithNoRedirect } from '../Toast';

const style = updateStyle('userBar', {
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
    edit
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

  return (
    <React.Fragment>
      {isMyProfile && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <React.Fragment>
            {edit ? (
              <Text
                style={{ color: brandGray, fontSize: 14 }}
                onPress={updateHandler}
              >
                保存
              </Text>
            ) : (
              <Text
                style={{ color: brandGray, fontSize: 14 }}
                onPress={() => setEdit(true)}
              >
                編集
              </Text>
            )}
          </React.Fragment>
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
        </View>
      )}
    </React.Fragment>
  );
});

const ChallengeNoteActivity = (props: any) => {
  const { data, history, updateHandler, deleteHandler, isMyProfile } = props;

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

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(data.text);
  const [type, setType] = useState(data.type);

  const handleUpdate = () => {
    updateHandler({ text, type })
      .then(() => setEdit(false))
      .then(() => successToastWithNoRedirect('ノートを更新'));
  };

  return (
    <React.Fragment>
      <Activity
        activity={activity}
        styles={style}
        onPress={() => path && history.push(path)}
        Footer={() =>
          isNote(data.type) && (
            <ActivityFooter
              updateHandler={handleUpdate}
              deleteHandler={deleteHandler}
              isMyProfile={isMyProfile}
              text={text}
              type={type}
              edit={edit}
              setEdit={setEdit}
            />
          )
        }
      />
      {edit && (
        <Textarea
          value={text}
          bordered
          rowSpan={6}
          onChangeText={text => setText(text)}
        />
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

  return <Activity activity={activity} styles={style} />;
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

  return <Activity activity={activity} styles={style} />;
};

export default withRouter(ChallengeNoteActivity);
