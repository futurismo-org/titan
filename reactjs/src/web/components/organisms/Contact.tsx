import React from 'react';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';

import { TITAN_TWITTER_URL } from '~/constants/appInfo';
import ContactForm from '~/web/containers/ContactFormContainer';

const Contact = (props: any) => {
  return (
    <Paper>
      <Title text="お問い合わせ" />
      <p>お問い合わせは、こちらのフォームからお願いします。</p>
      <p>
        TwitterDMやチャットでも受け付けています。
        <a href={TITAN_TWITTER_URL} target="_blank" rel="noopener noreferrer">
          @titan_dev_1234
        </a>
      </p>
      <ContactForm />
    </Paper>
  );
};

export default Contact;
