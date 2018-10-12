class ChangeRacketsModelNullFalse < ActiveRecord::Migration[5.2]
  def change
    change_column_null :rackets, :model, false
  end
end
