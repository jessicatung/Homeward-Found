class SightingsController < ApplicationController

  def index
  end

  def new # dont need this later
    @sighting = Sighting.new
  end

  def create
    sighting = Sighting.new(strong_params)

    if sighting.save
      algorithm = Algorithm.new(sighting, Losting.all)
      sightings = algorithm.search
      #filter
      #for results with a high score, future feature would be to send message to the user of a hit
      render json: sightings
    else
      # errors
      redirect_to new_sighting_path
    end
  end

  private

  def strong_params
    params.require(:sighting).permit(:animal_type, :size, :breed, :coat_color, :coat_length, :Lat, :Lng, :event_date, :tag, :detail, :found)
  end

end
