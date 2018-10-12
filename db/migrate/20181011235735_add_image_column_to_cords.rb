class AddImageColumnToCords < ActiveRecord::Migration[5.2]
  def change
    add_column :cords, :image, :string, default: ""
  end
end
