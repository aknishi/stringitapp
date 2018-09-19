class AddOrderLineColumnToCords < ActiveRecord::Migration[5.2]
  def change
    add_column :cords, :order_line_id, :integer
    add_index :cords, :order_line_id
  end
end
