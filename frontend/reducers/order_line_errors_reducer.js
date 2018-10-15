import {
  RECEIVE_ORDER_LINE_ERRORS, 
  RECEIVE_ORDER_LINE,
  CLEAR_ORDER_LINE_ERRORS } from '../actions/order_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER_LINE_ERRORS:
      return action.errors;
    case RECEIVE_ORDER_LINE:
      return [];
    case CLEAR_ORDER_LINE_ERRORS:
      return [];
    default:
      return state;
  }
};
