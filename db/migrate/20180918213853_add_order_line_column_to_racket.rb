class AddOrderLineColumnToRacket < ActiveRecord::Migration[5.2]
  def change
    add_column :rackets, :order_line_id, :integer
    add_index :rackets, :order_line_id
  end
end
