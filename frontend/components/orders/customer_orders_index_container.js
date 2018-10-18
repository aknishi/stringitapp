import { connect } from 'react-redux';
import React from 'react';
import CustomerOrdersIndex from './customer_orders_index';
import { fetchOrders  } from '../../actions/order_actions';
import { fetchRackets } from '../../actions/racket_actions';
import { fetchCords } from '../../actions/cord_actions';
import { fetchOrderLines } from '../../actions/order_line_actions';
import { selectOrdersByCustomer } from '../../reducers/selectors';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const currentUserId = state.session.id;
  const getOrders = selectOrdersByCustomer(state.entities.orders, currentUserId);
  //reverse order:
  const orders = getOrders.slice(0).reverse()
  const orderLines = values(state.entities.orderLines);
  const loading = state.ui.loadingOrder.loading;
  return({
    orders,
    orderLines,
    loading
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  fetchOrderLines: orderId => dispatch(fetchOrderLines(orderId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerOrdersIndex);
