import values from 'lodash/values';

export const selectOrderLines = (state, orderId) => {
  const allOrderLines = values(state.entities.orderLines);
  return allOrderLines.filter(ol => ol.order_id === orderId)
}

export const selectCustomers = (users) => {
  const customers = values(users).filter(user => user.admin === false)
  return customers;
}

export const selectOrdersByCustomer = (orders, customerId) => {
  const customerOrders = values(orders).filter(order => order.customer.id === customerId)
  return customerOrders;
}
