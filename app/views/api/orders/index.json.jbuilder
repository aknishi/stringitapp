@orders.each do |order|
  json.set! order.id do
    json.partial! "api/orders/order", order: order
    json.orderLineIds order.order_lines.pluck(:id)
  end
end
