class SightingsController < ApplicationController

  def index
    render partial: "index"
  end

  def new
    @sighting = Sighting.new

    api = PetFinder::Client.new
    @cat_breeds = api.get_breeds("cat")
    @dog_breeds = api.get_breeds("dog")

    render :partial => "new"
  end

  def create
    sighting = Sighting.create(strong_params)
    User.find(session[:user_id]).sightings << sighting

    algorithm = Algorithm.new(sighting, Losting.all)
    ordered_lostings = algorithm.search
    notify_user(ordered_lostings)

    # render json: ordered_lostings
    redirect_to root_path
  end

  def recent
    Sighting.ordered_json
    sightings = Sighting.ordered_json
    render json: sightings
  end

  private

  def notify_user(ordered_lostings)
    user = User.find(ordered_lostings[0].user_id)
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
      :found,
      :avatar
      )
  end

end
