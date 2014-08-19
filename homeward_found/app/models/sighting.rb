class Sighting < ActiveRecord::Base
  belongs_to :user

  # See Losting
  def self.ordered_json
    order("event_date DESC").limit(10).to_json
  end
end
