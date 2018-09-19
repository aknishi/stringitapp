import { connect } from 'react-redux';
import React from 'react';
import OrdersIndex from './orders_index';
import { fetchOrders } from '../../actions/order_actions';
import { fetchOrderLines } from '../../actions/order_line_actions';
import values from 'lodash/values';

const mapStateToProps = (state) => ({
  orders: values(state.entities.orders),
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchOrderLines: orderId => dispatch(fetchOrderLines(orderId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersIndex);
