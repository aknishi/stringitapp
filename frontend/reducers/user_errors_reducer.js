import {
  RECEIVE_USER_ERRORS,
  RECEIVE_USER,
  CLEAR_USER_ERRORS
} from '../actions/user_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case CLEAR_USER_ERRORS:
      return [];
    case RECEIVE_USER:
      return [];
    default:
      return state;
  }
};
