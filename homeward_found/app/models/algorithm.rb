class Algorithm

  def initialize (listing, collection)
    @listing = listing
    @collection = collection
    @mapped_collection = []
  end

  def map_score
    @mapped_collection = @collection.map do |match|
      score = 100
      score = 0 if @listing.animal_type != match.animal_type
      score -= 20 if @listing.coat_length != match.coat_length
      score -= 20 if @listing.coat_color != match.coat_color
      score -= 10 if @listing.size != match.size
      score -= 5 if @listing.breed != match.breed
      
      distance_index = (@listing.location.x - match.location.x) ** 2 + (@listing.location.y - match.location.y) ** 2
      points = Math.floor(10 * (Math.sqrt(distance_index) - 1))
      score -= points if points > 0

      date_index = @listing.date - match.date
      points = date_index * 30
      score -= points if points > 0
    end
    filter
  end

  def filter
    @mapped_collection.select { |match| match}
  end

end