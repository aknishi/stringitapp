class CreateUsersRackets < ActiveRecord::Migration[5.2]
  def change
    create_table :rackets_users, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :racket, index: true
    end
  end
end
