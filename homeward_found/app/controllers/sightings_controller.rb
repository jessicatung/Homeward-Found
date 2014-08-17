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
      algorithm.search
      #for results with a high score, future feature would be to send message to the user of a hit
      render json: sighting
    else
      # errors
      redirect_to new_sighting_path
    end
  end

  private

  def strong_params
    params.require(:losting).permit(:animal_type, :size, :breed, :coat_color, :coat_length, :location, :tag, :detail, :found, :date_seen)
  end

end
