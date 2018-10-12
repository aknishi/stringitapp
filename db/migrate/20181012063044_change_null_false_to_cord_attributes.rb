class ChangeNullFalseToCordAttributes < ActiveRecord::Migration[5.2]
  def change
    change_column :cords, :brand, :string, :null => false
    change_column :cords, :model, :string, :null => false
    change_column :cords, :color, :string, :null => false
  end
end
