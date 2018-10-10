import { RECEIVE_ORDER, RECEIVE_ORDERS, REMOVE_ORDER } from '../actions/order_actions';

import merge from 'lodash/merge';

const ordersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type) {
    case RECEIVE_ORDERS:
      return action.orders;
    case RECEIVE_ORDER:
      return merge({}, state, {[action.order.id]: action.order});
    case REMOVE_ORDER:
      nextState = merge({}, state);
      delete nextState[action.id];
      return nextState;
    default:
      return state;

  }
};

export default ordersReducer;
