class SightingsController < ApplicationController

  def index
  end

  def new # dont need this later
    @sighting = Sighting.new
  end

  def create

  end

  private

  def strong_params
    params.require(:losting).permit(:type, :size, :breed, :coat_type, :coat_length, :location, :tag, :detail, :found, :date_seen)
  end

end