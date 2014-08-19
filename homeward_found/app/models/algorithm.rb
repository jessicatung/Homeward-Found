# Good OO call here.  Really good
#
# I think the name sucks though...what kind of algorithm is it?  But still, v.
# proud of your OO on this.
class Algorithm

  def initialize (listing, collection)
    @listing = listing
    @collection = collection
  end

  def search
    @collection.sort_by { |match| score(match) }.reverse
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
    score
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

