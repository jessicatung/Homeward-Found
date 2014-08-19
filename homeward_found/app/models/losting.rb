class Losting < ActiveRecord::Base
  belongs_to :user

  scope :most_recent, ->(limit=10) { order("event_date DESC").limit(limit||10) }

  # Bad name.  Ordered?  Ordered how?  By what?
  # A better tool here is a scope
  #
  # Choosing to return it as JSON is a view concern (presentation or
  # serialization logic).  A better call would be
  #
  # Losting.most_recent.to_json in the controller (presumably) where this is
  # called.
  #
  #
  #irb(main):011:0> Losting.most_recent(2).map(&:pet_name)
  #  Losting Load (0.4ms)  SELECT  "lostings".* FROM "lostings"   ORDER BY
  #  event_date DESC LIMIT 2
  #  => ["ginger", "bob"]
  #  irb(main):012:0> Losting.most_recent.map(&:pet_name)
  #    Losting Load (0.4ms)  SELECT  "lostings".* FROM "lostings"   ORDER BY
  #    event_date DESC LIMIT 10
  #    => ["clifford", "ginger", "fido", "bob", "lucky", "ginger", "fido",
  #    "fido", "spot", "molly"]
  #
  def self.ordered_json
    order("event_date DESC").limit(10).to_json
  end

end
