import { connect } from 'react-redux';
import React from 'react';
import OrderLinesIndex from './order_lines_index';
import { fetchOrderLines, destroyOrderLine } from '../../actions/order_line_actions';
import { fetchOrders } from '../../actions/order_actions';
import { fetchRackets } from '../../actions/racket_actions';
import { fetchCords } from '../../actions/cord_actions';
import { selectOrderLines } from '../../reducers/selectors';


const mapStateToProps = (state, { orderId }) => {
  const orderLines = selectOrderLines(state, orderId);
  const loading = state.ui.loading.loading;
  const currentUserId = state.session.id;
  const admin = state.session.admin;
  return({
    orderId,
    data: orderLines,
    loading,
    currentUserId,
    admin
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrderLines: orderId => dispatch(fetchOrderLines(orderId)),
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  fetchOrders: () => dispatch(fetchOrders()),
  destroyOrderLine: orderLine => dispatch(destroyOrderLine(orderLine))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLinesIndex);
