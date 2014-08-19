class Sighting < ActiveRecord::Base
  belongs_to :user
  validates :Lat, :Lng, presence: true

  def self.ordered_json
    order("event_date DESC").limit(10).to_json
  end

end
