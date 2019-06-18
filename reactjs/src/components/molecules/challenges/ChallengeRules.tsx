import * as React from 'react';

const remark2react = require('remark-react');
const remark = require('remark');

const ChallengeRules = (props: any) => (
  <React.Fragment>
    {
      remark()
        .use(remark2react)
        .processSync(props.text).contents
    }
  </React.Fragment>
);

export default ChallengeRules;
