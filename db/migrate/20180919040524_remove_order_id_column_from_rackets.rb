class RemoveOrderIdColumnFromRackets < ActiveRecord::Migration[5.2]
  def change
    remove_column :rackets, :order_line_id
  end
end
