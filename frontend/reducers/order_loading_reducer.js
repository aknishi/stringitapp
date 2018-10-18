import {
  START_LOADING_ORDER,
  RECEIVE_ORDER, 
  RECEIVE_ORDERS } from '../actions/order_actions';

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return Object.assign({}, state, { loading: false });
    case RECEIVE_ORDERS:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_ORDER:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default loadingReducer;
