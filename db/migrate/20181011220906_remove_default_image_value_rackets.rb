class RemoveDefaultImageValueRackets < ActiveRecord::Migration[5.2]
  def change
    change_column_default :rackets, :image, nil
  end
end
