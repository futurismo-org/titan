import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = (props: any) => {
  const { user, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        user && user.isAdmin === true ? (
          // Adminならば、PrivateRouteに渡されたcomponentを返します。
          <Component {...props} />
        ) : (
          // Adminでなければルートページ(/login)に飛ばします。
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  user: state.firebase.profile
});

export default connect(mapStateToProps)(AdminRoute);
