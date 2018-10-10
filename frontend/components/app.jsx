import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import WelcomePage from './session_form/welcome';
import NavbarContainer from './session_form/navbar_container';
import OrdersIndexContainer from './orders/orders_index_container';
import OrderFormContainer from './orders/order_form_container';

const App = () => (
  <div>
    <header>
      <Route path="/" component={NavbarContainer} />
    </header>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={WelcomePage} />
      <ProtectedRoute exact path="/orders" component={OrdersIndexContainer} />
      <ProtectedRoute exact path="/orderform" component={OrderFormContainer} />
  </div>
);

export default App;
