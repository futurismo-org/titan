import React from 'react';
import UserItem from '../atoms/UserItem';
import AuthButton from '../atoms/AuthButton';

const NavigationItem = (props: any) => {
  const { profile } = props;
  const authenticated = profile.isLoaded && !profile.isEmpty;

  const renderAuthButton = () => {
    return <AuthButton />;
  };

  const renderUserItem = (user: any) => {
    return <UserItem user={user} />;
  };

  return authenticated ? renderUserItem(profile) : renderAuthButton();
};

export default NavigationItem;
