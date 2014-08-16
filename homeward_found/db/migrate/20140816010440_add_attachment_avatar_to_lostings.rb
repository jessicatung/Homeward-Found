class AddAttachmentAvatarToLostings < ActiveRecord::Migration
  def self.up
    change_table :lostings do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :lostings, :avatar
  end
end
