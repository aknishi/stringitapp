class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :order_number, null:false
      t.integer :customer_id, null: false
      t.string :status, null: false, default: "Pending"
      t.text :comments
      
      t.timestamps
    end
    add_index :orders, :order_number, unique: true
    add_index :orders, :customer_id
    add_index :orders, :status
  end
end
