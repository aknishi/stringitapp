import { RECEIVE_CORD, RECEIVE_CORDS } from '../actions/cord_actions';

import merge from 'lodash/merge';

const cordsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};

  switch(action.type) {
    case RECEIVE_CORDS:
      return action.cords;
    case RECEIVE_CORD:
      return merge({}, state, {[action.cord.id]: action.cord});
    default:
      return state;

  }
};

export default cordsReducer;
