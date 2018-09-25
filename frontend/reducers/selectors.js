export const orderLinesByOrder = (state, orderId) => {
  const orderLines = state.entities.orderLines;
  const orderLinesByOrderId = [];
  Object.keys(orderLines).forEach(orderLineId => {
    const orderLine = orderLines[orderLineId];
    if (orderLines[orderLineId].order_id === orderId) orderLinesByOrderId.push(orderLine)
  })
  return orderLinesByOrderId;
};
