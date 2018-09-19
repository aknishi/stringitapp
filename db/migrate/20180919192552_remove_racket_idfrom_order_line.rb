class RemoveRacketIdfromOrderLine < ActiveRecord::Migration[5.2]
  def change
    add_column :rackets, :order_line_id, :integer, index: true
    add_column :cords, :order_line_id, :integer, index: true
    remove_column :order_lines, :racket_id
    remove_column :order_lines, :main_cord_id
    remove_column :order_lines, :cross_cord_id
  end

end
