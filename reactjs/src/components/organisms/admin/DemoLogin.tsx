import * as React from 'react';
import AuthModal from '../../atoms/AuthModal';

const DemoLogin = (props: any) => (
  <AuthModal open onClose={() => null} title="管理者用ログイン" />
);

export default DemoLogin;
