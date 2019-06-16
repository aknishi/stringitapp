import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute, AdminProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import WelcomePage from './homepage/welcome';
import NavbarContainer from './homepage/navbar_container';
import UserShowContainer from './user_profile/user_show_container';
import OrdersIndexContainer from './orders/orders_index_container';
import OrderFormContainer from './orders/order_form_container';
import CustomerFormContainer from './user_profile/customer_form_container';
import EditCustomerFormContainer from './user_profile/edit_customer_form_container';
import RacketIndexContainer from './rackets/racket_index_container';
import RacketFormContainer from './rackets/racket_form_container';
import CordIndexContainer from './cords/cord_index_container';
import CordFormContainer from './cords/cord_form_container';
import CustomerOrdersIndexContainer from './orders/customer_orders_index_container';

const App = () => (
  <div>
    <header className="header">
      <Route path="/" component={NavbarContainer} />
    </header>
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} />
    <Route exact path="/" component={WelcomePage} />
    <AdminProtectedRoute exact path="/orders" component={OrdersIndexContainer} />
    <ProtectedRoute exact path="/orderform" component={OrderFormContainer} />
    <AdminProtectedRoute exact path="/customer-form" component={CustomerFormContainer} />
    <ProtectedRoute exact path="/rackets" component={RacketIndexContainer} />
    <AdminProtectedRoute exact path="/racket-form" component={RacketFormContainer} />
    <ProtectedRoute exact path="/strings" component={CordIndexContainer} />
    <AdminProtectedRoute exact path="/string-form" component={CordFormContainer} />
    <ProtectedRoute exact path="/users/:userId" component={UserShowContainer} />
    <ProtectedRoute exact path="/users/:userId/myorders" component={CustomerOrdersIndexContainer} />
    <AdminProtectedRoute exact path="/users/:userId/edit" component={EditCustomerFormContainer} />
  </div>
);

export default App;
