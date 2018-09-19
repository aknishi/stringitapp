import * as APIUtil  from '../util/order_api_util';

export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_ORDER_ERRORS = "RECEIVE_ORDER_ERRORS";

export const createOrder = order => dispatch => (
  APIUtil.createOrder(order).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const updateOrder = order => dispatch => (
  APIUtil.udpateOrder(order).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

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

const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders
})

const receiveOrder = order => ({
  type: RECEIVE_ORDER,
  order
})

const receiveErrors = error => ({
  type: RECEIVE_ORDER_ERRORS,
  error
})
