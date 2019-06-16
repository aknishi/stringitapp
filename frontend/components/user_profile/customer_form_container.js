import { connect } from 'react-redux';
import { createUser, clearErrors } from '../../actions/user_actions';
import { fetchOrders } from '../../actions/order_actions';
import React from 'react';
import CustomerForm from './customer_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.user
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createUser: user => dispatch(createUser(user)),
  clearErrors: () => dispatch(clearErrors()),
  fetchOrders: () => dispatch(fetchOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
