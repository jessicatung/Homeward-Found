class CreateLostings < ActiveRecord::Migration
  def change
    create_table :lostings do |t|
      t.belongs_to :user
      t.string :pet_name
      t.string :animal_type
      t.string :size
      t.string :breed
      t.string :coat_color
      t.string :coat_length
      t.decimal :Lat
      t.decimal :Lng
      t.string :tag
      t.text :detail
      # t. picture
      t.datetime :event_date
      t.timestamps
    end
  end
end
