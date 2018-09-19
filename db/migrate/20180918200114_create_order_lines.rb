class CreateOrderLines < ActiveRecord::Migration[5.2]
  def change
    create_table :order_lines do |t|
      t.integer :order_id, null: false
      t.integer :racket_id, null: false
      t.integer :main_cord_id, null: false
      t.integer :cross_cord_id, null: false
      t.integer :main_tension, null: false
      t.integer :cross_tension, null: false

      t.timestamps
    end
    add_index :order_lines, :order_id
    add_index :order_lines, :racket_id
  end
end
