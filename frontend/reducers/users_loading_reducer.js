import {
  START_LOADING_USERS,
  RECEIVE_USERS,
  START_LOADING_USER,
  RECEIVE_USER
} from '../actions/user_actions';

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_USERS:
      return Object.assign({}, state, { loading: true });
    case RECEIVE_USER:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_USER:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default loadingReducer;
