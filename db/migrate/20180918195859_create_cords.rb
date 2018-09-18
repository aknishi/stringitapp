class CreateCords < ActiveRecord::Migration[5.2]
  def change
    create_table :cords do |t|
      t.string :brand
      t.string :model
      t.string :gauge, null: false
      t.integer :length
      t.string :composition, null: false
      t.string :color

      t.timestamps
    end
  end
end
