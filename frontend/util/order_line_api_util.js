export const createOrderLine = order_line => (
  $.ajax({
    method: 'POST',
    url: `api/orders/${order_line.order_id}/order_lines`,
    data: order_line
  })
);

export const updateOrderLine = order_line => (
  $.ajax({
    method: 'PATCH',
    url: `api/order_lines/${order_line.id}`,
    data: { order_line }
  })
);

export const fetchOrderLines = () => (
  $.ajax({
    method: 'GET',
    url: 'api/order_lines'
  })
);

export const fetchOrderLine = id => (
  $.ajax({
    method: 'GET',
    url: `api/order_lines/${id}`
  })
);
