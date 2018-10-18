import { connect } from 'react-redux';
import React from 'react';
import OrderForm from './order_form';
import { selectCustomers } from '../../reducers/selectors';
import { createOrder, deleteOrder, updateOrder } from '../../actions/order_actions';
import { fetchUsers, updateUser, clearErrors } from '../../actions/user_actions';
import { fetchRackets } from '../../actions/racket_actions';
import { fetchCords } from '../../actions/cord_actions';
import { fetchOrders } from '../../actions/order_actions';
import { selectOrderLines } from '../../reducers/selectors';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const loading = state.ui.loading.loading;
  const customers = selectCustomers(state.entities.users);
  const orders = values(state.entities.orders);
  const order = orders[orders.length - 1]
  const orderLines = selectOrderLines(state, order.id);
  const errors= state.errors.user;
  return({
    orderLines,
    customers,
    loading,
    order,
    errors
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchOrders: () => dispatch(fetchOrders()),
  createOrder: order => dispatch(createOrder(order)),
  deleteOrder: id => dispatch(deleteOrder(id)),
  updateOrder: order => dispatch(updateOrder(order)),
  updateUser: user => dispatch(updateUser(user)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);
