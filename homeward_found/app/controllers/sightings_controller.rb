class SightingsController < ApplicationController

  def index
    sightings = Sighting.all
    render json: sightings
  end

  def new # dont need this later
    @sighting = Sighting.new
    @cat_breeds = []
    @dog_breeds = []
    responseCat = HTTParty.get("http://api.petfinder.com/breed.list?key=8a031807c83ba378f85a9b9cb98420d8&animal=cat&format=json")
    responseDog = HTTParty.get("http://api.petfinder.com/breed.list?key=8a031807c83ba378f85a9b9cb98420d8&animal=dog&format=json")

    cat_breeds = responseCat["petfinder"]["breeds"]["breed"]
    cat_breeds.each do |k,v|
      @cat_breeds << k.values
    end
    @cat_breeds.flatten

    dog_breeds = responseDog["petfinder"]["breeds"]["breed"]
    dog_breeds.each do |k,v|
      @dog_breeds << k.values
    end
    @dog_breeds.flatten
  end

  def create
    sighting = Sighting.new(strong_params)
    if sighting.save
      # algorithm = Algorithm.new(sighting, Losting.all)
      # sightings = algorithm.search
      #filter
      #for results with a high score, future feature would be to send message to the user of a hit
      # render json: sightings
    else
      # errors
    end
  end

  def recent
    Sighting.ordered_json
    sightings = Sighting.ordered_json
    render json: sightings
  end

  private

  def notify_user
    user = User.find(@ordered_lostings[0].user_id)
    NotificationMailer.possible_match_notification(user).deliver
  end

  def strong_params
    params.require(:sighting).permit(
      :animal_type,
      :size,
      :breed,
      :coat_color,
      :coat_length,
      :Lat,
      :Lng,
      :event_date,
      :tag,
      :detail,
      :found
      )
  end

end
