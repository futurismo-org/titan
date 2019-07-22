import * as React from 'react';
import styled from 'styled-components';

const remark2react = require('remark-react');
const remark = require('remark');

const Container = styled.div`
  /* line-height: 10px; */
`;

const MarkdownView = (props: any) => (
  <Container>
    {
      remark()
        .use(remark2react)
        .processSync(props.text).contents
    }
  </Container>
);

export default MarkdownView;
