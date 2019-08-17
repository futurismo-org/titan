import React from 'react';
import {
  View,
  Text,
  Content,
  Card,
  CardItem,
  Button,
  Grid,
  Col,
  Row
} from 'native-base';
import Title from '../atoms/Title';

const QuickActionCard = (props: any) => {
  return (
    <Card>
      <Grid>
        <Row
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 20 }}>オナ禁大会1ヶ月チャレンジ</Text>
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
  return (
    <View>
      <Content padder>
        <Title text="クイックアクション" />
        <QuickActionCard />
      </Content>
    </View>
  );
};

export default QuickActionList;
