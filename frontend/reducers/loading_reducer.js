import {
  RECEIVE_ORDER_LINES,
  RECEIVE_ORDER_LINE,
  START_LOADING_ORDER_LINES,
  START_LOADING_ORDER_LINE
} from '../actions/order_line_actions';

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER_LINES:
      return Object.assign({}, state, { loading: false });
    case RECEIVE_ORDER_LINE:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_ORDER_LINES:
      return Object.assign({}, state, { loading: true });
    case START_LOADING_ORDER_LINE:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default loadingReducer;
