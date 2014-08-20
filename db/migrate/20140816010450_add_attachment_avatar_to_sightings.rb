class AddAttachmentAvatarToSightings < ActiveRecord::Migration
  def self.up
    change_table :sightings do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :sightings, :avatar
  end
end
