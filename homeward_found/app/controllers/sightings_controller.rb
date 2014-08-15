class SightingsController < ApplicationController

  def index
  end

  def new # dont need this later
    @sighting = Sighting.new
  end

  def create
    sighting = Sighting.new(strong_params)

    if sighting.save
      # trigger search algorithm
      redirect_to root_path
    else
      # errors
      redirect_to new_sighting_path
    end
  end

  private

  def strong_params
    params.require(:losting).permit(:type, :size, :breed, :coat_type, :coat_length, :location, :tag, :detail, :found, :date_seen)
  end

end