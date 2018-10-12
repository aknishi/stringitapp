class AddImageColumnToRackets < ActiveRecord::Migration[5.2]
  def change
    add_column :rackets, :image, :string, default: ""
  end
end
