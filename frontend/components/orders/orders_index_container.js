import { connect } from 'react-redux';
import React from 'react';
import OrdersIndex from './orders_index';
import { fetchOrders, updateOrder } from '../../actions/order_actions';
import { fetchRackets } from '../../actions/racket_actions';
import { fetchCords } from '../../actions/cord_actions';
import { fetchUsers } from '../../actions/user_actions';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const getOrders = values(state.entities.orders);
  //reverse order:
  const orders = getOrders.slice(0).reverse()
  const orderLines = values(state.entities.orderLines);
  const loadingOrders = state.ui.loadingOrders.loading;
  const loadingSingleOrder = state.ui.loadingSingleOrder.loading;
  return({
    orders,
    orderLines,
    loadingOrders,
    loadingSingleOrder
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  updateOrder: order => dispatch(updateOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersIndex);
