class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :phone_number, null: false
      t.string :address
      t.text :comment
      t.boolean :admin, null: false, default: false

      t.timestamps
    end
    add_index :users, :name
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :admin

  end
end
