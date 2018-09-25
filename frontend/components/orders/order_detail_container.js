import { connect } from 'react-redux';
import React from 'react';
import OrderDetail from './order_detail';

const mapDispatchToProps = (dispatch , { order }) => ({
  fetchOrderLines: () => dispatch(fetchOrderLines(order.id))
});

export default connect(
  null,
  mapDispatchToProps
)(OrderDetail);
