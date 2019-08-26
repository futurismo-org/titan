import React from 'react';

import { Text } from 'native-base';

// <React.Fragment>
//   <Label>なにをやるのか?(What)</Label>
//   <Input value={what} onChangeText={text => setWhat(text)} />
//   <Text />
//   <Textarea
//     bordered
//     rowSpan={6}
//     placeholder="自己紹介(300字まで)"
//     value={why}
//     onChangeText={(text: string) => setWhy(text)}
//   />
// </React.Fragment>

const ChallengeObjectiveForm = (props: any) => {
  const { what, why, closeHandler } = props;

  return (
    <React.Fragment>
      <Text>{what}</Text>
    </React.Fragment>
  );
};

export default ChallengeObjectiveForm;
