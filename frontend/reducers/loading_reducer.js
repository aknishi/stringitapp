import {
  RECEIVE_ORDER_LINES,
  RECEIVE_ORDER_LINE,
  START_LOADING
} from '../actions/order_line_actions';
import { START_LOADING_RACKETS, RECEIVE_RACKETS } from '../actions/racket_actions';
import { START_LOADING_CORDS, RECEIVE_CORDS } from '../actions/cord_actions';

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
    case START_LOADING:
      return Object.assign({}, state, { loading: true });
    case START_LOADING_RACKETS:
      return Object.assign({}, state, { loading: true });
    case RECEIVE_RACKETS:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_CORDS:
      return Object.assign({}, state, { loading: true });
    case RECEIVE_CORDS:
      return Object.assign({}, state, { loading: false });
    default:
      return state;
  }
};

export default loadingReducer;
