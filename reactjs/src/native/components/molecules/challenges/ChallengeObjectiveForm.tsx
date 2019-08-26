import React, { useState, useEffect } from 'react';

import { Text, View, Textarea, Button } from 'native-base';

const ChallengeObjectiveForm = (props: any) => {
  const { inputWhat, inputWhy, closeHandler, isLoaded } = props;

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
    <View style={{ paddingTop: 25, paddingLeft: 10, paddingRight: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button onPress={closeHandler(what, why)}>
          <Text>保存</Text>
        </Button>
      </View>
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
    </View>
  );
};

export default ChallengeObjectiveForm;
