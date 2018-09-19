class AddOrderIdToOrdeLine < ActiveRecord::Migration[5.2]
  def change
    add_column :order_lines, :order_id, :integer, null: false
    add_index :order_lines, :order_id
  end
end
