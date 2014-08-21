# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140816010450) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lostings", force: true do |t|
    t.integer  "user_id"
    t.string   "pet_name",            limit: 20, null: false
    t.string   "animal_type",         limit: 20, null: false
    t.string   "size",                limit: 50, null: false
    t.string   "breed",               limit: 50, null: false
    t.string   "coat_color",          limit: 50, null: false
    t.string   "coat_length",         limit: 50, null: false
    t.decimal  "Lat",                            null: false
    t.decimal  "Lng",                            null: false
    t.string   "tag"
    t.text     "detail"
    t.datetime "event_date",                     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "sightings", force: true do |t|
    t.integer  "user_id"
    t.string   "animal_type",         limit: 20, null: false
    t.string   "size",                limit: 20, null: false
    t.string   "breed",               limit: 50, null: false
    t.string   "coat_color",          limit: 50, null: false
    t.string   "coat_length",         limit: 50, null: false
    t.decimal  "Lat",                            null: false
    t.decimal  "Lng",                            null: false
    t.string   "tag"
    t.text     "detail"
    t.datetime "event_date",                     null: false
    t.boolean  "found"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
