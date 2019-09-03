import * as React from 'react';

const remark2react = require('remark-react');
const remark = require('remark');

const MarkdownView = (props: any) => {
  const { text } = props;

  return (
    <React.Fragment>
      <div>
        {
          remark()
            .use(remark2react)
            .processSync(text).contents
        }
      </div>
    </React.Fragment>
  );
};

export default MarkdownView;
