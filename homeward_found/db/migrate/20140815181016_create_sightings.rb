class CreateSightings < ActiveRecord::Migration
  def change
    create_table :sightings do |t|
      t.belongs_to :user
      t.string :animal_type, null: false, limit: 20
      t.string :size, null: false, limit: 20
      t.string :breed, null: false, limit: 50
      t.string :coat_color, null: false, limit: 50
      t.string :coat_length, null: false, limit: 50
      t.decimal :Lat, null: false
      t.decimal :Lng, null: false
      t.string :tag
      t.text :detail, limit: 250
      t.datetime :event_date, null: false
      t.boolean :found
      t.timestamps
    end
  end
end
