import * as React from 'react';
import AuthModal from '../../atoms/AuthModal';

const DemoLogin = (props: any) => {
  return process.env.REACT_APP_ENV === 'demonstration' ? (
    <AuthModal open onClose={() => null} title="デモサイト管理者用" />
  ) : null;
};

export default DemoLogin;
