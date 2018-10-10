class AddRacketsBrandModelUniqueness < ActiveRecord::Migration[5.2]
  def change
    add_index :rackets, %i(brand model), unique: true
  end
end
