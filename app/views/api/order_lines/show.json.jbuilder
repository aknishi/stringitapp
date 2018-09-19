json.order_line do
  json.partial! "api/order_lines/order_line", order_line: @order_line
end

json.racket do
  json.partial! "api/rackets/racket", racket: @order_line.racket
