import { connect } from 'react-redux';
import React from 'react';
import OrderForm from './order_form';
import { selectCustomers } from '../../reducers/selectors';
import { createOrder, deleteOrder, updateOrder } from '../../actions/order_actions';
import { fetchUsers } from '../../actions/user_actions';
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
  return({
    orderLines,
    customers,
    loading,
    order
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderForm);
