class CreateRackets < ActiveRecord::Migration[5.2]
  def change
    create_table :rackets do |t|
      t.string :brand, null: false
      t.string :model
      t.string :color

      t.timestamps
    end
    add_index :rackets, :brand
  end
end
