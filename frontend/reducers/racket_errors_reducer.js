import {
  RECEIVE_RACKET_ERRORS,
  RECEIVE_RACKET,
  CLEAR_RACKET_ERRORS } from '../actions/racket_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RACKET_ERRORS:
      return action.errors;
    case RECEIVE_RACKET:
      return [];
    case CLEAR_RACKET_ERRORS:
      return [];
    default:
      return state;
  }
};
