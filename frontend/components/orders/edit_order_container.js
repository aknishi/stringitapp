import { connect } from 'react-redux';
import React from 'react';
import EditOrderForm from './edit_order_form';
import { fetchRackets } from '../../actions/racket_actions';
import { updateOrder } from '../../actions/order_actions';
import { createOrderLine } from '../../actions/order_line_actions';
import values from 'lodash/values';

const mapStateToProps = (state, { orderId }) => {
  const rackets = values(state.entities.rackets);
  const cords = values(state.entities.cords);
  const errors = values(state.errors.orderLine);
  return({
    rackets,
    cords,
    orderId,
    errors
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchRackets: () => dispatch(fetchRackets()),
  createOrderLine: (orderLine) => dispatch(createOrderLine(orderLine)),
  updateOrder: (order) => dispatch(updateOrder(order)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOrderForm);
