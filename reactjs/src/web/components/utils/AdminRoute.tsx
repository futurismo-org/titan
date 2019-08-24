import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '~/lib/firebase';

const AdminRoute = (props: any) => {
  const { user, isLogin, render: Component, ...rest } = props;

  if (!isLogin) return <React.Fragment />;

  console.log(user);

  return (
    <Route
      {...rest}
      render={props =>
        user && user.isAdmin ? (
          // Adminならば、PrivateRouteに渡されたcomponentを返します。
          <Component {...props} />
        ) : (
          // Adminでなければルートページ(/)に飛ばします。
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  isLogin: isLogin(state),
  user: state.firebase.profile
});

export default connect(mapStateToProps)(AdminRoute);
