# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_11_235735) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cords", force: :cascade do |t|
    t.string "brand"
    t.string "model"
    t.string "gauge", null: false
    t.integer "length"
    t.string "composition", null: false
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image", default: ""
    t.index ["brand"], name: "index_cords_on_brand"
    t.index ["gauge"], name: "index_cords_on_gauge"
    t.index ["length"], name: "index_cords_on_length"
    t.index ["model"], name: "index_cords_on_model"
  end

  create_table "order_lines", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "racket_id", null: false
    t.integer "main_cord_id"
    t.integer "cross_cord_id"
    t.integer "main_tension", null: false
    t.integer "cross_tension", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_lines_on_order_id"
    t.index ["racket_id"], name: "index_order_lines_on_racket_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "order_number", null: false
    t.integer "customer_id", null: false
    t.string "status", default: "Pending", null: false
    t.text "comments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["order_number"], name: "index_orders_on_order_number", unique: true
    t.index ["status"], name: "index_orders_on_status"
  end

  create_table "rackets", force: :cascade do |t|
    t.string "brand", null: false
    t.string "model", null: false
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.index ["brand", "model"], name: "index_rackets_on_brand_and_model", unique: true
    t.index ["brand"], name: "index_rackets_on_brand"
    t.index ["model"], name: "index_rackets_on_model"
  end

  create_table "rackets_users", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "racket_id"
    t.index ["racket_id"], name: "index_rackets_users_on_racket_id"
    t.index ["user_id"], name: "index_rackets_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "phone_number", null: false
    t.string "address"
    t.text "comment"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin"], name: "index_users_on_admin"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
