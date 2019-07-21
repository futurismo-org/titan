import * as React from 'react';
import { Container, Form, Item, Label, Input, Button, Text } from 'native-base';

const AuthScreen = (props: any) => {
  return (
    <Container>
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input autoCapitalize="none" autoCorrect={false} />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input secureTextEntry autoCapitalize="none" autoCorrect={false} />
        </Item>
        <Button full rounded success>
          <Text>Login</Text>
        </Button>
      </Form>
    </Container>
  );
};

export default AuthScreen;
