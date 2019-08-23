import React from 'react';
import { View } from 'native-base';

const ViewRow = (props: any) => {
  const { justfyContent } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: justfyContent || 'center'
      }}
    >
      {props.children}
    </View>
  );
};

export default ViewRow;
