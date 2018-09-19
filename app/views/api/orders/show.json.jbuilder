json.partial! "api/orders/order", order: @order
json.customer do
  json.partial! "api/users/user", user: @order.customer
end
json.orderLineIds @order.order_lines.pluck(:id)
