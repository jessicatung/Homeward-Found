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
    render nothing: true
    # redirect_to root_path
  end

  def recent
    Sighting.ordered_json
    sightings = Sighting.ordered_json
    render json: sightings
  end

  def relevant_listings
    lat = 37.784633
    lng = -122.397403
    #params[:lat], params[:lng]
    listings = Sighting.all
    listings = listings.get_listings(lat, lng, 5, 3)

    render json: listings
  end

  def show
    @sighting = Sighting.find(params[:id])
    render partial: "show"
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
