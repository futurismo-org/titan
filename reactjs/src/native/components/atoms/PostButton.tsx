import * as React from 'react';
import { Button } from 'native-base';
import TouchableText from './TouchableText';

const PostButton = (props: any) => {
  const text = props.text ? props.text : '投稿';
  const { isLogin, to } = props;

  return isLogin ? (
    <Button rounded>
      <TouchableText text={text} path={to} />
    </Button>
  ) : null;
};

export default PostButton;
