import { RECEIVE_RACKET, RECEIVE_RACKETS } from '../actions/racket_actions';

import merge from 'lodash/merge';

const racketsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type) {
    case RECEIVE_RACKETS:
      return action.rackets;
    case RECEIVE_RACKET:
      return merge({}, state, {[action.racket.id]: action.racket});
    default:
      return state;

  }
};

export default racketsReducer;
