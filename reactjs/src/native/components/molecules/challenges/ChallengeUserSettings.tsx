import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-native';
import { Form, Item, Label, Input, Text, Content } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import firebase from '~/lib/firebase';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import { successToast, errorToast } from '../../atoms/Toast';
import SubmitButton from '../../atoms/SubmitButton';

import { primaryColor } from '~/lib/theme';

import { ACC_DAYS, PAST_DAYS } from '~/lib/challenge';

const db = firebase.firestore();

const ChallengeUserSettings = (props: any) => {
  const {
    user,
    resourceId,
    redirectPath,
    fetchUser,
    error,
    loading,
    isLogin,
    history
  } = props;

  useEffect(() => {
    fetchUser(resourceId);
  }, [fetchUser, resourceId]);

  const [displayName, setDisplayName] = useState('');
  const [showMode, setShowMode] = useState('');

  const onDisplayNameChange = (text: string) => {
    setDisplayName(text);
  };

  const updateHandler = (data: any) => {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };

    db.doc(resourceId)
      .update(updateData)
      .then(() =>
        successToast(redirectPath, history.push, '設定を更新しました。')
      )
      .catch(error => errorToast(error.message));
  };

  const radioList = [ACC_DAYS, PAST_DAYS];
  const radioMap = new Map([[ACC_DAYS, 0], [PAST_DAYS, 1]]);

  const radioProps = [
    { label: ACC_DAYS, value: 0 },
    { label: PAST_DAYS, value: 1 }
  ];

  const onShowModePress = (value: number) => {
    setShowMode(radioList[value]);
  };

  useEffect(() => {
    const initDisplayName = user && user.displayName;
    const initShowMode = user && user.showMode;

    setDisplayName(initDisplayName || '');
    setShowMode(initShowMode || ACC_DAYS);
  }, [user]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {user && (
        <React.Fragment>
          <Title text="ユーザ設定" />
          {isLogin ? (
            <React.Fragment>
              <Form>
                <Item>
                  <Label>ユーザ名</Label>
                  <Input
                    value={displayName}
                    onChangeText={onDisplayNameChange}
                  />
                </Item>
              </Form>
              <Text />
              <Content padder>
                <Label>日数表示設定</Label>
                <Text />
                <RadioForm
                  buttonColor={primaryColor}
                  selectedButtonColor={primaryColor}
                  buttonSize={15}
                  animation
                  initial={radioMap.get(user.showMode)}
                  radio_props={radioProps}
                  onPress={onShowModePress}
                />
              </Content>
              <SubmitButton
                handler={() =>
                  updateHandler({
                    displayName,
                    showMode
                  })
                }
              />
            </React.Fragment>
          ) : (
            <Text>ログインが必要です。</Text>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeUserSettings);
