class LostingsController < ApplicationController
  include HTTParty
  require 'json'
  def index

  end

  def new # dont need this later
    @losting = Losting.new
    @cat_breeds = []
    @dog_breeds = []
    responseCat = HTTParty.get("http://api.petfinder.com/breed.list?key=#{ENV['PET_FINDER_API_KEY']}&animal=cat&format=json")
    responseDog = HTTParty.get("http://api.petfinder.com/breed.list?key=#{ENV['PET_FINDER_API_KEY']}&animal=dog&format=json")

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
    losting = Losting.new(strong_params)
    if losting.save
      # algorithm = Algorithm.new(losting, Sighting.all)
      # lostings = algorithm.search
      #filter
      # render json: lostings
    else
      # errors
      redirect_to new_losting_path
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  def recent
    Losting.ordered_json
    lostings = Losting.ordered_json
    render json: lostings
  end

  private

  def strong_params
    params.require(:losting).permit(:pet_name, :animal_type, :size, :breed, :coat_color, :coat_length, :Lat, :Lng, :tag, :detail, :event_date)
  end
end
