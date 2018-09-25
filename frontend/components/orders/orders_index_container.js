import { connect } from 'react-redux';
import React from 'react';
import OrdersIndex from './orders_index';
import { fetchOrders, updateOrder } from '../../actions/order_actions';
import { fetchOrderLines } from '../../actions/order_line_actions';
import values from 'lodash/values';

const mapStateToProps = (state) => {
  const orders = values(state.entities.orders);
  const orderLines = values(state.entities.orderLines);
  return({
    orders,
    orderLines
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchOrderLines: orderId => dispatch(fetchOrderLines(orderId)),
  updateOrder: order => dispatch(updateOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersIndex);
