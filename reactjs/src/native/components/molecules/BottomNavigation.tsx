import React, { useState, useRef } from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Modalize from 'react-native-modalize';
import { primaryColor } from '~/lib/theme';
import QueckActionList from '~/native/containers/QuickActionListContainer';

const Navigation = (props: any) => {
  const { history, userShortId, isLogin } = props;
  const [activeTab, setActiveTab] = useState('home');

  const modalRef = useRef<Modalize>(null);

  const tabs = [];
  tabs.push({
    key: 'back',
    // @ts-ignore
    icon: 'arrow-circle-left',
    label: '戻る',
    barColor: primaryColor,
    pressColor: 'rgba(255, 255, 255, 0.16)'
  });
  tabs.push({
    key: 'home',
    icon: 'home',
    label: 'ホーム',
    barColor: primaryColor,
    pressColor: 'rgba(255, 255, 255, 0.16)',
    path: '/'
  });
  tabs.push({
    key: 'profile',
    icon: 'user-circle',
    label: 'マイページ',
    barColor: primaryColor,
    pressColor: 'rgba(255, 255, 255, 0.16)',
    path: `/u/${userShortId}`
  });
  tabs.push({
    key: 'quick',
    icon: 'flash',
    label: 'クイック',
    barColor: primaryColor,
    pressColor: 'rgba(255, 255, 255, 0.16)'
  });

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

  const onOpen = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.open();
    }
  };

  const onClose = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.close();
    }
  };

  const tabHandler = (newTab: any) => {
    setActiveTab(newTab.key);
    if (newTab.path) {
      history.push(newTab.path);
    } else {
      if (newTab.key === 'back') {
        history.goBack();
      } else {
        onOpen();
      }
    }
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <React.Fragment>
          <BottomNavigation
            activeTab={activeTab}
            onTabPress={tabHandler}
            renderTab={renderTab}
            tabs={tabs}
          />
          <Modalize ref={modalRef}>
            <QueckActionList closeHandler={onClose} />
          </Modalize>
        </React.Fragment>
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
