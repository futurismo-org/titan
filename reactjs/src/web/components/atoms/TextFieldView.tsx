import React from 'react';
import shortId from 'shortid';

const TextFieldView = (props: any) => {
  const { text } = props;

  return (
    <React.Fragment>
      {text.split('\n').map((item: any) => (
        <React.Fragment key={shortId.generate()}>
          {item}
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default TextFieldView;
