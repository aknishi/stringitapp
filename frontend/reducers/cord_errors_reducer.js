import { RECEIVE_CORD_ERRORS, RECEIVE_CORD } from '../actions/cord_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CORD_ERRORS:
      return action.errors;
    case RECEIVE_CORD:
      return [];
    default:
      return state;
  }
};
