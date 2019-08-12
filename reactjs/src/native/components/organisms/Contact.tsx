import React from 'react';
import { Content, Text } from 'native-base';
import Title from '../atoms/Title';

import ContactForm from '~/native/containers/ContactFormContainer';

const Contact = (props: any) => {
  return (
    <React.Fragment>
      <Content padder>
        <Title text="お問い合わせ" />
        <Text>
          お問い合わせは、こちらのフォームからお願いします。
          TiwtterDMやチャットでも受け付けています。
        </Text>
        <ContactForm />
      </Content>
    </React.Fragment>
  );
};

export default Contact;
