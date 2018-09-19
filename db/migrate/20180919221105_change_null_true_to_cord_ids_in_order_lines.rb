class ChangeNullTrueToCordIdsInOrderLines < ActiveRecord::Migration[5.2]
  def change
    change_column :order_lines, :main_cord_id, :integer, :null => true
    change_column :order_lines, :cross_cord_id, :integer, :null => true
  end
end
