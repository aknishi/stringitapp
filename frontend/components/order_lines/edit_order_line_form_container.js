import { connect } from 'react-redux';
import React from 'react';
import EditOrderLineForm from './edit_order_line_form';
import { fetchRackets } from '../../actions/racket_actions';
import { updateOrder } from '../../actions/order_actions';
import { clearErrors } from '../../actions/order_line_actions';
import { updateOrderLine } from '../../actions/order_line_actions';
import values from 'lodash/values';

const mapStateToProps = (state, { orderLine }) => {
  const rackets = values(state.entities.rackets);
  const cords = values(state.entities.cords);
  const errors = state.errors.orderLine;
  return({
    rackets,
    cords,
    orderLine,
    errors
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchRackets: () => dispatch(fetchRackets()),
  updateOrderLine: (orderLine) => dispatch(updateOrderLine(orderLine)),
  updateOrder: (order) => dispatch(updateOrder(order)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOrderLineForm);
