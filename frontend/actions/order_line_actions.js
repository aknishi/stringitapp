import * as APIUtil  from '../util/order_line_api_util';
import values from 'lodash/values';

export const RECEIVE_ORDER_LINES = "RECEIVE_ORDER_LINES";
export const RECEIVE_ORDER_LINE = "RECEIVE_ORDER_LINE";
export const RECEIVE_ORDER_LINE_ERRORS = "RECEIVE_ORDER_LINE_ERRORS";
export const REMOVE_ORDER_LINE = "REMOVE_ORDER_LINE";
export const START_LOADING_ORDER_LINE = "START_LOADING_ORDER_LINE";
export const START_LOADING_ORDER_LINES = "START_LOADING_ORDER_LINES";

export const createOrderLine = orderLine => dispatch => {
  dispatch(startLoadingLine());
  return APIUtil.createOrderLine(orderLine).then(
    orderLine => dispatch(receiveOrderLine(orderLine)),
    err => dispatch(receiveErrors(err.responseJSON)))
};

export const updateOrderLine = orderLine => dispatch => (
  APIUtil.udpateOrderLine(orderLine).then(
    orderLine => dispatch(receiveOrderLine(orderLine)),
    err => dispatch(receiveErrors(err.responseJSON)))
);

export const fetchOrderLines = orderId => dispatch => {
  dispatch(startLoadingLines());
  return APIUtil.fetchOrderLines(orderId).then(
    orderLines => dispatch(receiveOrderLines(orderLines)),
    err => dispatch(receiveErrors(err.responseJSON)))
};

export const destroyOrderLine = orderLine => dispatch => (
  OrderLineAPIUtil.destroyOrderLine(orderLine).then(
    orderLine => dispatch(removeOrderLine(orderLine)))
);

export const startLoadingLines = () => ({
  type: START_LOADING_ORDER_LINES
});

export const startLoadingLine = () => ({
  type: START_LOADING_ORDER_LINE
});

const receiveOrderLines = orderLines => ({
  type: RECEIVE_ORDER_LINES,
  orderLines
})

const receiveOrderLine = orderLine => ({
  type: RECEIVE_ORDER_LINE,
  orderLine
})

export const removeOrderLine = orderLine => ({
  type: REMOVE_ORDER_LINE,
  orderLine
});

const receiveErrors = errors => ({
  type: RECEIVE_ORDER_LINE_ERRORS,
  errors
})
