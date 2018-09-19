import { RECEIVE_ORDER_LINE, RECEIVE_ORDER_LINES } from '../actions/order_line_actions';

import merge from 'lodash/merge';

const orderLinesReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type) {
    case RECEIVE_ORDER_LINES:
      return action.orderLines;
    case RECEIVE_ORDER_LINE:
      return merge({}, state, {[action.orderLine.id]: action.orderLine});
    default:
      return state;

  }
};

export default orderLinesReducer;
