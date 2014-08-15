class CreateLostings < ActiveRecord::Migration
  def change
    create_table :lostings do |t|
      t.belongs_to :user
      t.string :name
      t.string :type
      t.string :size
      t.string :breed
      t.string :coat_type
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
