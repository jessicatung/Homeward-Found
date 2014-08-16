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
    t.string   "name"
    t.string   "animal_type"
    t.string   "size"
    t.string   "breed"
    t.string   "coat_color"
    t.string   "coat_length"
    t.string   "location"
    t.string   "tag"
    t.text     "detail"
    t.date     "date_lost"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "sightings", force: true do |t|
    t.integer  "user_id"
    t.string   "animal_type"
    t.string   "size"
    t.string   "breed"
    t.string   "coat_color"
    t.string   "coat_length"
    t.string   "location"
    t.string   "tag"
    t.text     "detail"
    t.datetime "date_seen"
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
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
