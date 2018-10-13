import { connect } from 'react-redux';
import React from 'react';
import OrderLineForm from './order_line_form';
import { fetchRackets } from '../../actions/racket_actions';
import { updateOrder } from '../../actions/order_actions';
import { fetchCords } from '../../actions/cord_actions';
import { createOrderLine } from '../../actions/order_line_actions';
import values from 'lodash/values';

const mapStateToProps = (state, { orderId }) => {
  const rackets = values(state.entities.rackets);
  const cords = values(state.entities.cords);
  return({
    rackets,
    cords,
    orderId
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchRackets: () => dispatch(fetchRackets()),
  fetchCords: () => dispatch(fetchCords()),
  createOrderLine: (orderLine) => dispatch(createOrderLine(orderLine)),
  updateOrder: (order) => dispatch(updateOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderLineForm);
