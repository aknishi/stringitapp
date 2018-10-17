import * as APIUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';
export const START_LOADING_USERS = 'START_LOADING_USERS';

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_USER_ERRORS
})

export const startLoadingUsers = () => ({
  type: START_LOADING_USERS
});

export const createUser = user => dispatch => (
  APIUtil.createUser(user).then(
    user => dispatch(receiveUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  )
);

export const fetchUsers = () => dispatch => {
  dispatch(startLoadingUsers());
  return APIUtil.fetchUsers().then(
    users => dispatch(receiveUsers(users))
  )
};

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id).then(
    user => dispatch(receiveUser(user))
  )
);

export const updateUser = user => dispatch => (
  APIUtil.updateUser(user).then(
    user => dispatch(receiveUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  )
);
