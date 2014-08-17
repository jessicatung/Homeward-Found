class LostingsController < ApplicationController

  def index
    lostings = Losting.all
    render json: lostings
  end

  def new # dont need this later
    @losting = Losting.new
  end

  def create
    losting = Losting.new(strong_params)
    User.find(session[:user_id]).lostings << losting

    if losting.save
      algorithm = Algorithm.new(losting, Sighting.all)
      ordered_sightings = algorithm.search
      top_results = ordered_sightings[0..19]
      render json: top_results
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
