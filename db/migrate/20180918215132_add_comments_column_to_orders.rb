class AddCommentsColumnToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :comments, :text
  end
end
