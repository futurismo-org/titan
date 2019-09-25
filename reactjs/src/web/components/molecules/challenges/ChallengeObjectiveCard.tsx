import * as React from 'react';
import styled from 'styled-components';
import Card, { CardProps } from '@material-ui/core/Card';
import { CardContent, List, ListItem, ListItemText } from '@material-ui/core';
import MarkdownView from '~/web/components/atoms/MarkdownView';
import { brandGray } from '~/lib/theme';

const StyledText = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
  font-size: 24px;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  padding: 30px 25px 15px 15px;
` as React.ComponentType<CardProps>;

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    width: 480px;
  }
  width: 320px;
`;

export const ChallengeObjectiveWhatCard = (props: any) => {
  const { text } = props;
  return (
    <Wrapper>
      <StyledCard>
        <CardContent>
          <StyledText>{text}</StyledText>
        </CardContent>
      </StyledCard>
    </Wrapper>
  );
};

export const ChallengeObjectiveWOOPCard = (props: any) => {
  const { wish, outcome, obstacle, plan } = props;

  return (
    <Wrapper>
      {wish || outcome || obstacle || plan ? (
        <List>
          {plan && (
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <p style={{ color: brandGray }}>if-thenプランニング(Plan)</p>
                }
                secondary={
                  <React.Fragment>
                    <MarkdownView text={plan} />
                  </React.Fragment>
                }
                disableTypography
              />
            </ListItem>
          )}
          {wish && (
            <ListItem>
              <ListItemText
                primary={
                  <p style={{ color: brandGray }}>なぜやるのか?(Wish)</p>
                }
                secondary={
                  <React.Fragment>
                    <MarkdownView text={wish} />
                  </React.Fragment>
                }
                disableTypography
              />
            </ListItem>
          )}
          {outcome && (
            <ListItem>
              <ListItemText
                primary={
                  <p style={{ color: brandGray }}>最大の成果(Outcome)</p>
                }
                secondary={
                  <React.Fragment>
                    <MarkdownView text={outcome} />
                  </React.Fragment>
                }
                disableTypography
              />
            </ListItem>
          )}
          {obstacle && (
            <ListItem>
              <ListItemText
                primary={
                  <p style={{ color: brandGray }}>目標を妨げるもの(Obstale)</p>
                }
                secondary={
                  <React.Fragment>
                    <MarkdownView text={obstacle} />
                  </React.Fragment>
                }
                disableTypography
              />
            </ListItem>
          )}
        </List>
      ) : (
        <p>WOOP法をつかって目標をさらに分析しましょう。</p>
      )}
    </Wrapper>
  );
};
