import { connect } from 'react-redux';
import React from 'react';
import OrderForm from './order_form';

const mapStateToProps = ({ errors }) => ({
  errors: errors.order
});

const mapDispatchToProps = (dispatch) => ({
  createOrder: order => dispatch(createOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);
