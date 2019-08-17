import React, { useState } from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import { primaryColor } from '~/lib/theme';

const Navigation = (props: any) => {
  const { history, userShortId, isLogin } = props;
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'ホーム',
      barColor: primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      path: '/'
    },
    {
      key: 'quick',
      icon: 'flash',
      label: 'クイック',
      barColor: primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'user-circle',
      label: 'マイページ',
      barColor: primaryColor,
      pressColor: 'rgba(255, 255, 255, 0.16)',
      path: `/u/${userShortId}`
    }
  ];

  const renderIcon = (icon: any) => ({ isActive }: any) => (
    <Icon size={24} color="white" name={icon} />
  );

  const renderTab = ({ tab, isActive }: any) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={renderIcon(tab.icon)}
    />
  );

  const tabHandler = (newTab: any) => {
    setActiveTab(newTab.key);
    newTab.path && history.push(newTab.path);
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={tabHandler}
          renderTab={renderTab}
          tabs={tabs}
        />
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => {
  const isLogin =
    !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded;

  const userShortId = state.firebase.profile.shortId;
  return {
    isLogin,
    userShortId,
    ...props
  };
};

export default connect(mapStateToProps)(withRouter(Navigation));
