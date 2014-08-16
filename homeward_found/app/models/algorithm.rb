class Algorithm

  def initialize (listing, collection)
    # @listing = listing
    @listing = Losting.new(animal_type: "cat", size: "small", breed: "still working on it", coat_color: "black", coat_length: "long", Lat: 37.8, Lng: -122.703, event_date: "2014-08-15 10:00:00")
    @collection = collection
  end

  def search
    result = @collection.sort_by { |match| score(match) }.reverse!
    # returns the top 20 scores in descending score order
    result[0..20]
  end

  def score(match)
    score = 100
    score = 0 if @listing.animal_type != match.animal_type

    score -= 10 if @listing.size != match.size
    score -= 5 if @listing.breed != match.breed
    score -= 20 if @listing.coat_color != match.coat_color
    score -= 20 if @listing.coat_length != match.coat_length

    points = ((distance_between(match) - 1) * 5).floor
    score -= points if points > 0

    date_index = ((match.event_date - @listing.event_date)/86400).abs
    points = (date_index * 30).floor
    score -= points if points > 0
  end

  def distance_between(match)
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

end

