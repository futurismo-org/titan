import React, { useState, useEffect } from 'react';

import { Text, View, Textarea, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import { Linking } from 'expo';
import { brandWhite, secondaryColor, brandGray } from '~/lib/theme';

const Headline = (props: any) => {
  return <Text style={{ margin: 5, fontSize: 25 }}>{props.children}</Text>;
};

const ChallengeObjectiveForm = (props: any) => {
  const {
    userShortId,
    challengeId,
    fetchUserWithShortId,
    isLoaded,
    handleSave,
    history,
    redirectPath,
    objective
  } = props;

  const [what, setWhat] = useState('');
  const [wish, setWish] = useState('');
  const [outcome, setOutcome] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [plan, setPlan] = useState('');

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    if (isLoaded) {
      setWhat(objective.what ? objective.what : '');
      setWish(objective.wish ? objective.wish : '');
      setOutcome(objective.outcome ? objective.outcome : '');
      setObstacle(objective.obstacle ? objective.obstacle : '');
      setPlan(objective.plan ? objective.plan : '');
    }
  }, [fetchUserWithShortId, isLoaded, objective, userShortId]);

  const onCancel = () => history.push(redirectPath);
  const onSave = () =>
    handleSave({
      what,
      wish,
      outcome,
      obstacle,
      plan,
      isCreate: !objective
    }).then(() => history.push(redirectPath));

  return (
    <React.Fragment>
      {isLoaded && (
        <View
          style={{
            padding: 10,
            backgroundColor: brandWhite
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button onPress={onCancel} light>
              <Text>キャンセル</Text>
            </Button>
            <Button onPress={onSave} style={{ marginLeft: 5 }}>
              <Text>保存</Text>
            </Button>
          </View>
          <Text />
          <Text style={{ color: brandGray }}>
            チャレンジを通じて達成したいことを書きます。
            定量的(計測可能、数値)目標、自分でコントロール可能な目標を記入してください。
            目標は
            <Text
              onPress={() => history.push(`/c/${challengeId}/goals`)}
              style={{ textDecorationLine: 'underline', color: brandGray }}
            >
              ゴールボード
            </Text>
            でみんなと共有されます。
          </Text>
          <Text />
          <Text>なにをやるのかを一言で入力してください。</Text>
          <Textarea
            bordered
            rowSpan={2}
            value={what}
            placeholder="なにをやるのか？"
            onChangeText={(text: string) => setWhat(text)}
          />
          <Text />
          <Text>
            ここからの入力は、 目標達成のための最新の科学的手法、
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                color: secondaryColor
              }}
              onPress={() => history.push(redirectPath)}
            >
              WOOP
            </Text>
            に従って設計されています。入力は少し大変なので必須ではありません。
            しかし、WOOPを使うと目標達成率は2倍になりますのでぜひ取り組んでください。
          </Text>
          <Text />
          <Headline>1. 願望(Wish)</Headline>
          <Text>
            この目標に取り組む理由を書いてください。とくに、強い願望を書いてください。
          </Text>
          <Textarea
            bordered
            rowSpan={4}
            value={wish}
            placeholder="なぜやるのか？"
            onChangeText={(text: string) => setWish(text)}
          />
          <Text />
          <Headline>2. 成果(Outcome)</Headline>
          <Text>
            この目標に取り組むことで得られるベストな成果を書いてください。
            そして、それを手に入れた自分をできるだけ具体的にイメージしてください。
            イメージを助けるために、理想の人物の名前や参考になる記事、画像へのURLも合わせて入力するとよいです。
          </Text>
          <Textarea
            bordered
            rowSpan={4}
            value={outcome}
            placeholder="ベストな成果はなにか？"
            onChangeText={(text: string) => setOutcome(text)}
          />
          <Text />
          <Headline>3. 障害(Obstacle)</Headline>
          <Text>
            目標を達成することを妨げる、障害になるものを詳細に書いてください。
          </Text>
          <Text style={{ fontSize: 15 }}>
            どんな考え方が目標の達成を妨げているのか？
          </Text>
          <Text style={{ fontSize: 15 }}>
            どんな行動が目標の達成を妨げているのか？
          </Text>
          <Text style={{ fontSize: 15 }}>
            どんな癖や習慣が目標の達成を妨げているのか？
          </Text>
          <Text style={{ fontSize: 15 }}>
            どんな思い込みが目標の達成を妨げているのか？
          </Text>
          <Text style={{ fontSize: 15 }}>
            どんな感情が目標の達成を妨げているのか？
          </Text>
          <Textarea
            bordered
            rowSpan={4}
            value={obstacle}
            placeholder="障害はなにか？"
            onChangeText={(text: string) => setObstacle(text)}
          />
          <Text />
          <Headline>4. 計画(Plan)</Headline>
          <Text>
            この目標に取り組む理由を書いてください。とくに、強い願望を書いてください。
            障害が発生したときの対処方法を、
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                color: secondaryColor
              }}
              onPress={() => Linking.openURL('https://amzn.to/2lBHBhU')}
            >
              if-thenプランニング
            </Text>
            という心理学の手法に落とし込みます。目標達成率が３倍になる手法です。
            やり方は、簡単。
            <Text style={{ fontWeight: 'bold' }}>「XしたらYする」</Text>
            と決めるだけ。Xには、いつ、どこで、というトリガーを書きます。Yには行動を書きます。
          </Text>
          <Textarea
            bordered
            rowSpan={4}
            value={plan}
            placeholder="if-thenプランニングを列挙"
            onChangeText={(text: string) => setPlan(text)}
          />
          <Text />
        </View>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeObjectiveForm);
