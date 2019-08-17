import React, { useEffect } from 'react';
import { View, Text, Content, Card, Button, Grid, Col, Row } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { withRouter } from 'react-router-native';
import Title from '../atoms/Title';
import Error from '../atoms/Error';

const QuickActionCard = withRouter((props: any) => {
  const { challenge, history, userShortId } = props;

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
          <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>
            {challenge.title}
          </Text>
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
            <Button
              full
              onPress={() =>
                history.push(`/u/${userShortId}/cat/${challenge.categoryId}`)
              }
            >
              <Text>カテゴリ</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    </Card>
  );
});

const QuickActionList = (props: any) => {
  const {
    challenges,
    fetchProfileChallenges,
    resourceId,
    error,
    loading,
    userShortId
  } = props;

  useEffect(() => {
    fetchProfileChallenges(resourceId);
  }, [fetchProfileChallenges, resourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {<Spinner visible={loading} />}
      {!loading && challenges && (
        <View>
          <Content padder>
            <Title text="クイックアクション" />
            {challenges.map((challenge: any) => (
              <QuickActionCard
                challenge={challenge}
                key={challenge.id}
                userShortId={userShortId}
              />
            ))}
          </Content>
        </View>
      )}
    </React.Fragment>
  );
};

export default QuickActionList;
