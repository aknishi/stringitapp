json.extract! @order_line, :id, :order_id, :main_tension, :cross_tension

json.racket do
  json.partial! "api/rackets/racket", racket: @order_line.racket
end

json.main_cord do
  json.partial! "api/cords/cord", cord: @order_line.main_cord
end

json.cross_cord do
  json.partial! "api/cords/cord", cord: @order_line.cross_cord
end
