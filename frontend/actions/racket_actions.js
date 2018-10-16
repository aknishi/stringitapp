import * as APIUtil  from '../util/racket_api_util';

export const RECEIVE_RACKETS = "RECEIVE_RACKETS";
export const RECEIVE_RACKET = "RECEIVE_RACKET";
export const RECEIVE_RACKET_ERRORS = "RECEIVE_RACKET_ERRORS";
export const START_LOADING_RACKETS = "START_LOADING_RACKETS";
export const CLEAR_RACKET_ERRORS = "CLEAR_RACKET_ERRORS";

export const createRacket = racket => dispatch => (
  APIUtil.createRacket(racket).then(
    racket => dispatch(receiveRacket(racket)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateRacket = racket => dispatch => (
  APIUtil.updateRacket(racket).then(
    racket => dispatch(receiveRacket(racket)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchRackets = () => dispatch => {
  dispatch(startLoading());
  return APIUtil.fetchRackets().then(
    rackets => dispatch(receiveRackets(rackets)),
    err => dispatch(receiveErrors(err.responseJSON))
  )
};

export const fetchRacket = id => dispatch => (
  APIUtil.fetchRacket(id).then(
    racket => dispatch(receiveRacket(racket)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const startLoading = () => ({
  type: START_LOADING_RACKETS
});

const receiveRackets = rackets => ({
  type: RECEIVE_RACKETS,
  rackets
})

const receiveRacket = racket => ({
  type: RECEIVE_RACKET,
  racket
})

const receiveErrors = errors => ({
  type: RECEIVE_RACKET_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_RACKET_ERRORS
})
