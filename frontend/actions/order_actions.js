import * as APIUtil  from '../util/order_api_util';

export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_ORDER_ERRORS = "RECEIVE_ORDER_ERRORS";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const START_LOADING_ORDER = "START_LOADING_ORDER";

export const createOrder = order => dispatch => (
  APIUtil.createOrder(order).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateOrder = order => dispatch => {
  dispatch(startLoading());
  return APIUtil.updateOrder(order).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON)))
};

export const fetchOrders = () => dispatch => (
  APIUtil.fetchOrders().then(
    orders => dispatch(receiveOrders(orders)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchOrder = id => dispatch => (
  APIUtil.fetchOrder(id).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const deleteOrder = id => dispatch => (
  APIUtil.deleteOrder(id).then(
    () => dispatch(removeOrder(id)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const startLoading = () => ({
  type: START_LOADING_ORDER
});

const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
})

const removeOrder = id => ({
  type: REMOVE_ORDER,
  id
})

const receiveErrors = errors => ({
  type: RECEIVE_ORDER_ERRORS,
  errors
})
