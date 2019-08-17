import React, { useEffect } from 'react';
import { View, Text, Content, Card, Button, Grid, Col, Row } from 'native-base';
import Title from '../atoms/Title';

const QuickActionCard = (props: any) => {
  const { challenge } = props;

  return (
    <Card>
      <Grid>
        <Row
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <Text style={{ fontSize: 20 }}>{challenge.title}</Text>
        </Row>
        <Row>
          <Col>
            <Button full success>
              <Text>記録する</Text>
            </Button>
          </Col>
          <Col>
            <Button full warning>
              <Text>リセット</Text>
            </Button>
          </Col>
          <Col>
            <Button full>
              <Text>カテゴリ</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    </Card>
  );
};

const QuickActionList = (props: any) => {
  const { challenges, fetchProfileChallenges, resourceId } = props;

  useEffect(() => {
    fetchProfileChallenges(resourceId);
  }, [fetchProfileChallenges, resourceId]);

  return (
    <View>
      <Content padder>
        <Title text="クイックアクション" />
        {challenges.map((challenge: any) => (
          <QuickActionCard challenge={challenge} key={challenge.id} />
        ))}
      </Content>
    </View>
  );
};

export default QuickActionList;
