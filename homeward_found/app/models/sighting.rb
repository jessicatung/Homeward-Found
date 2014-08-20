class Sighting < ActiveRecord::Base
  belongs_to :user
  validates :Lat, :Lng, presence: true
  has_attached_file :avatar, :style => {medium: "300x300>", thumb: "100x100>"}
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates :coat_color, :coat_length, :breed, :size, :event_date, presence: true

  def self.ordered_json
    order("event_date DESC").limit(10).to_json(methods: [:long_date])
  end

  def self.get_listings(lat, lng, max_dist, day_limit)
    algorithm = Algorithm.new("", "")

    filtered_listings = Sighting.select do |match|
      algorithm.days_apart(Time.now, match.event_date) < day_limit
    end
    filtered_listings = filtered_listings.sort_by do |match|
      algorithm.distance_between(lat, lng, match)
    end
    filtered_listings[0..9]
  end

  def long_date
    event_date.to_formatted_s(:long_ordinal)
  end

end
