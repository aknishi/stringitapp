import { connect } from 'react-redux';
import React from 'react';
import OrderLinesIndex from './order_lines_index';
import { fetchOrderLines } from '../../actions/order_line_actions';
import { fetchOrders } from '../../actions/order_actions';
import { fetchRackets } from '../../actions/racket_actions';
import { fetchCords } from '../../actions/cord_actions';
import { selectOrderLines } from '../../reducers/selectors';


const mapStateToProps = (state, { orderId }) => {
  const orderLines = selectOrderLines(state, orderId);
  const loading = state.ui.loading.loading;
  return({
    orderId,
    data: orderLines,
    loading,
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrderLines: orderId => dispatch(fetchOrderLines(orderId)),
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLinesIndex);
