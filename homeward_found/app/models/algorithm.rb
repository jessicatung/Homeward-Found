class Algorithm

  def initialize (listing, collection)
    # @listing = listing
    @listing = Losting.new(animal_type: "cat", size: "small", breed: "still working on it", coat_color: "black", coat_length: "long", Lat: 37.7846330, Lng: -122.3974140)
    @collection = collection
    @mapped_collection = []
  end

  def search
    map_score
  end

  def map_score
    @mapped_collection = @collection.map do |match|
      score = 100
      score = 0 if @listing.animal_type != match.animal_type
      score -= 10 if @listing.size != match.size
      score -= 5 if @listing.breed != match.breed
      score -= 20 if @listing.coat_color != match.coat_color
      score -= 20 if @listing.coat_length != match.coat_length

      points = Math.floor((distance_between - 1) * 10)
      score -= points if points > 0

      date_index = (match.event_date - @listing.event_date).to_i.abs
      points = date_index * 30
      score -= points if points > 0

      score
    end

    @mapped_collection
    # render :json @mapped_collection
    # filter
  end

  def distance_between
    latOne = @listing.Lat
    latTwo = match.Lat

    lngOne = @listing.Lng
    lngTwo = match.Lng

    r = 6371
    pi_const = Math::PI / 180

    theta1 = latOne * pi_const
    theta2 = latTwo * pi_const

    deltaTheta = (latTwo - latOne) * pi_const
    deltaLambda = (lngTwo - lngOne) * pi_const

    a = Math.sin(deltaTheta/2) ** 2
    a += Math.cos(theta1) * Math.cos(theta2) * Math.sin(deltaLambda/2) ** 2
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    distance = r * c
  end

  def filter
    # @mapped_collection.select { |match| match}
  end

end










