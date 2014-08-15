class CreateSightings < ActiveRecord::Migration
  def change
    create_table :sightings do |t|
      t.belongs_to :user
      t.string :animal_type
      t.string :size
      t.string :breed
      t.string :coat_color
      t.string :coat_length
      t.string :location
      t.string :tag
      t.text :detail
      # t. picture
      t.datetime :date_seen
      t.boolean :found
      t.timestamps
    end
  end
end
