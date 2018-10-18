import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (!loggedIn) {
      return (<Component {...props} />)
    } else {
        return (<Redirect to="/orders" />)
      }
  }}/>
);

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (loggedIn) {
      return (<Component {...props} />)
    } else {
      return (<Redirect to="/login" />)
      }
  }}/>
);

const AdminProtected = ({component: Component, path, admin, currentUserId, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (loggedIn) {
      if (admin) {
        return (<Component {...props} />)
      } else {
        return (<Redirect to={`/users/${currentUserId}/myorders`} />)
      }
    } else {
      return (<Redirect to="/login" />)
      }
  }}/>
);

const mapStateToProps = ( state ) => ({
  loggedIn: Boolean(state.session.id),
  currentUserId: state.session.id,
  admin: state.session.admin
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth))
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected))
export const AdminProtectedRoute = withRouter(connect(mapStateToProps, null)(AdminProtected))
