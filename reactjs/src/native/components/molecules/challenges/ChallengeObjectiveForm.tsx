import React, { useState, useEffect } from 'react';

import { Text, View, Textarea, Button } from 'native-base';
import { brandWhite } from '~/lib/theme';

const ChallengeObjectiveForm = (props: any) => {
  const { inputWhat, inputWhy, saveHandler, cancelHandler, isLoaded } = props;

  const [what, setWhat] = useState('');
  const [why, setWhy] = useState('');

  useEffect(() => {
    if (isLoaded) {
      setWhat(inputWhat);
      setWhy(inputWhy);
    } else {
      setWhat('');
      setWhy('');
    }
  }, [inputWhat, inputWhy, isLoaded]);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: brandWhite
      }}
    >
      <Text>なにをやるのか?(What)</Text>
      <Textarea
        bordered
        rowSpan={2}
        value={what}
        onChangeText={(text: string) => setWhat(text)}
      />
      <Text />
      <Text>なにをやるのか?(What)</Text>
      <Textarea
        bordered
        rowSpan={4}
        value={why}
        onChangeText={(text: string) => setWhy(text)}
      />
      <Text />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button onPress={cancelHandler} light>
          <Text>キャンセル</Text>
        </Button>
        <Button onPress={saveHandler(what, why)} style={{ marginLeft: 5 }}>
          <Text>保存</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChallengeObjectiveForm;
