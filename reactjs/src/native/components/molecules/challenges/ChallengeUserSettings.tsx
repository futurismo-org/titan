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
  const [pastDays, setPastDays] = useState('');
  const [showMode, setShowMode] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onPastDaysChange = (e: any) => {
    e.preventDefault();
    setPastDays(e.target.value);
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

  const initDisplayName = user && user.displayName;
  const initPastDays = user && user.pastDays.toString();
  const initShowMode = user && user.showMode;

  const CHALLENGE_ACC_DAYS = '大会累積日数';
  const PAST_DAYS = '過去連続日数';
  const radioList = [CHALLENGE_ACC_DAYS, PAST_DAYS];
  const radioMap = new Map([[CHALLENGE_ACC_DAYS, 0], [PAST_DAYS, 1]]);

  const radioProps = [
    { label: CHALLENGE_ACC_DAYS, value: 0 },
    { label: PAST_DAYS, value: 1 }
  ];

  const onShowModePress = (value: number) => {
    setShowMode(radioList[value]);
  };

  useEffect(() => {
    setDisplayName(initDisplayName ? initDisplayName : '');
    setPastDays(initPastDays ? initPastDays : '');
    setShowMode(initShowMode ? initShowMode : CHALLENGE_ACC_DAYS);
  }, [initDisplayName, initPastDays, initShowMode]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {user && (
        <React.Fragment>
          <Title text="ユーザ設定" />
          {isLogin ? (
            <React.Fragment>
              <Form>
                <Item>
                  <Label>ユーザ名</Label>
                  <Input value={displayName} onChange={onDisplayNameChange} />
                </Item>
                <Item>
                  <Label>過去連続日数</Label>
                  <Input value={pastDays} onChange={onPastDaysChange} />
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
                    pastDays: parseInt(pastDays),
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
