class SightingsController < ApplicationController

  def index
    sightings = Sighting.all
    render json: sightings
  end

  def new # dont need this later
    @sighting = Sighting.new
  end

  def create
    sighting = Sighting.new(strong_params)

    if sighting.save
      algorithm = Algorithm.new(sighting, Losting.all)
      @ordered_lostings = algorithm.search
      notify_user
      render json: @ordered_lostings
    else
      # errors
    end
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
