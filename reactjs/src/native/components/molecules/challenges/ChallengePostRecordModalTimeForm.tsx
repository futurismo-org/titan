import React, { useState } from 'react';
import { View, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import Title from '../../atoms/Title';
import { brandWhite } from '~/lib/theme';

const ChallengePostRecordModalTimeForm = (props: any) => {
  const { closeHandler, postHandler, data } = props;
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  return (
    <React.Fragment>
      <View
        style={{
          padding: 10,
          backgroundColor: brandWhite
        }}
      >
        <Title text="実施時間" />
        <TimePicker
          selectedHours={hours}
          selectedMinutes={minutes}
          onChange={(hours: any, minutes: any) => {
            setHours(hours);
            setMinutes(minutes);
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button onPress={closeHandler} light>
            <Text>キャンセル</Text>
          </Button>
          <Button
            onPress={() =>
              postHandler({ ...data, minutes: hours * 60 + minutes })
            }
            style={{ marginLeft: 5 }}
          >
            <Text>保存</Text>
          </Button>
        </View>
      </View>
    </React.Fragment>
  );
};

export default ChallengePostRecordModalTimeForm;
