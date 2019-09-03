import React from 'react';
import UserItem from '../atoms/UserItem';
import AuthButton from '../atoms/AuthButton';

const NavigationItem = (props: any) => {
  const { profile, isLogin } = props;

  const renderAuthButton = () => {
    return <AuthButton />;
  };

  const renderUserItem = (user: any) => {
    return <UserItem user={user} />;
  };

  return isLogin ? renderUserItem(profile) : renderAuthButton();
};

export default NavigationItem;
