import {
  START_LOADING_ORDER,
  START_LOADING_ORDERS,
  RECEIVE_ORDER,
  RECEIVE_ORDERS } from '../actions/order_actions';

const initialState = {
  loading: false
};

export const loadingOrders = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDERS:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_ORDERS:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export const loadingSingleOrder = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_ORDER:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};
