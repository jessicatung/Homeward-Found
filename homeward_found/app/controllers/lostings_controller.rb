class LostingsController < ApplicationController

  include HTTParty
  require 'json'



  def index
    render partial: "index"
  end

  def new # dont need this later
    @losting = Losting.new
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
    render :partial => "new"
  end

  def create
    losting = Losting.new(strong_params)
    losting.pet_name = losting.pet_name.capitalize
    User.find(session[:user_id]).lostings << losting

    if losting.save
      # algorithm = Algorithm.new(losting, Sighting.all)
      # ordered_sightings = algorithm.search
      # top_results = ordered_sightings[0..19]
      # top_results.to_json
      # render partial: 'index'
      # render json: top_results
      redirect_to root_path
    else
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
