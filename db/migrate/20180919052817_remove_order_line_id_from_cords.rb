class RemoveOrderLineIdFromCords < ActiveRecord::Migration[5.2]
  def change
    remove_column :cords, :order_line_id
  end
end
