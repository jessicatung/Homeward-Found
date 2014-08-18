class LostingsController < ApplicationController

  include HTTParty
  require 'json'

  def index

  end

  def new # dont need this later
    @losting = Losting.new
    # This is not core to a controller, this processing logic, while good belongs in a class
    @cat_breeds = []
    @dog_breeds = []
    # These strings could be constants inside of the class mentioned 3 lines
    # above
    responseCat = HTTParty.get("http://api.petfinder.com/breed.list?key=8a031807c83ba378f85a9b9cb98420d8&animal=cat&format=json")
    responseDog = HTTParty.get("http://api.petfinder.com/breed.list?key=8a031807c83ba378f85a9b9cb98420d8&animal=dog&format=json")

    # These two could be DRYed out in the class I mentioned above.
    cat_breeds = responseCat["petfinder"]["breeds"]["breed"]
    # You hurt me.  This is what #each_with_object or #inject is for.
    cat_breeds.each do |k,v|
      @cat_breeds << k.values
    end
    @cat_breeds.flatten

    dog_breeds = responseDog["petfinder"]["breeds"]["breed"]
    dog_breeds.each do |k,v| # See above.
      @dog_breeds << k.values
    end
    @dog_breeds.flatten

  end

  def create
    losting = Losting.new(strong_params)
    User.find(session[:user_id]).lostings << losting

    if losting.save
      # Eek, this name is not very helpful.  Algorithm?  Can we be more
      # descriptive?  NaiveAlgorithm?
      # WeightedLogarithmicScaleBasedOnGeolocAlogirthm?
      algorithm = Algorithm.new(losting, Sighting.all)
      ordered_sightings = algorithm.search # Why can't Algorithm fire this off by default?
      top_results = ordered_sightings[0..19] # I don't feel like the controller should know this implementation detail  Could you have Algorithm take an argument that does this?  Or better yet, could this be the default?

      # Imagine this call:  Algorithm.new(losting, Sighting, result_count: 20)
      #
      # That could swallow up all these implementation manipulations.
      #
      # The golden glow of OO-enlightenment is coming for you.  Fight hard
      # here.
      render json: top_results
    else
      # No.  Don't do this.  Makes me sad.  Blow up spectacularly is better
      # errors
    end
  end

  def recent
    Losting.ordered_json
    lostings = Losting.ordered_json
    render json: lostings
  end

  private

  def strong_params
    params.require(:losting).permit(
      :pet_name,
      :animal_type,
      :size,
      :breed,
      :coat_color,
      :coat_length,
      :Lat,
      :Lng,
      :tag,
      :detail,
      :event_date
      )
  end
end
