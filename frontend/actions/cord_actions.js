import * as APIUtil  from '../util/cord_api_util';

export const RECEIVE_CORDS = "RECEIVE_CORDS";
export const RECEIVE_CORD = "RECEIVE_CORD";
export const RECEIVE_CORD_ERRORS = "RECEIVE_CORD_ERRORS";

export const createCord = cord => dispatch => (
  APIUtil.createCord(cord).then(
    cord => dispatch(receiveCord(cord)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateCord = cord => dispatch => (
  APIUtil.udpateCord(cord).then(
    cord => dispatch(receiveCord(cord)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchCords = () => dispatch => (
  APIUtil.fetchCords().then(
    cords => dispatch(receiveCords(cords)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchCord = id => dispatch => (
  APIUtil.fetchCord(id).then(
    cord => dispatch(receiveCord(cord)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

const receiveCords = cords => ({
  type: RECEIVE_CORDS,
  cords
})

const receiveCord = cord => ({
  type: RECEIVE_CORD,
  cord
})

const receiveErrors = errors => ({
  type: RECEIVE_CORD_ERRORS,
  errors
})
