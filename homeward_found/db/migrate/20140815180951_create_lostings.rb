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
      t.string :location
      t.string :tag
      t.text :detail
      # t. picture
      t.date :date_lost
      t.timestamps
    end
  end
end
