class Losting < ActiveRecord::Base
  belongs_to :user
  has_attached_file :avatar, :style => {medium: "300x300>", thumb: "100x100>"}
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates :pet_name, :coat_color, :coat_length, :breed, :size, :event_date, presence: true

  def self.ordered_json
    order("event_date DESC").limit(10).to_json(methods: [:long_date])
  end

  def long_date
    event_date.to_formatted_s(:long_ordinal)
  end

end
