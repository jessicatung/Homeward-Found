class Losting < ActiveRecord::Base
  belongs_to :user

  def self.ordered_json
    order("event_date DESC").limit(1).to_json
  end

end
