import React from 'react';
import styled from 'styled-components';
import Title from '../../atoms/Title';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeJournal = (props: any) => {
  return (
    <React.Fragment>
      <Wrapper>
        <Title text="チャレンジ目標" />
        <Title text="努力の軌跡" />
      </Wrapper>
    </React.Fragment>
  );
};

export default ChallengeJournal;
