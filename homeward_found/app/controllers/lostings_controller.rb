class LostingsController < ApplicationController

  def index
    render partial: "index"
  end

  def new # dont need this later
    @losting = Losting.new

    api = PetFinder::Client.new
    @cat_breeds = api.get_breeds("cat")
    @dog_breeds = api.get_breeds("dog")

    render :partial => "new"
  end

  def create
    losting = Losting.new(strong_params)
    losting.pet_name.capitalize!
    losting.save

    User.find(session[:user_id]).lostings << losting

    algorithm = Algorithm.new(losting, Sighting.all)
    ordered_sightings = algorithm.search
    top_results = ordered_sightings[0..19]
    # render json: top_results
    render nothing: true
    # redirect_to root_path
  end

  def recent
    Losting.ordered_json
    lostings = Losting.ordered_json
    render json: lostings
  end

  def relevant_listings
    lat = params['coords']['lat'].to_d
    lng = params['coords']['lng'].to_d

    listings = Losting.all
    listings = listings.get_listings(lat, lng, 5, 3)

    render json: listings
  end

  def show
    @losting = Losting.find(params[:id])
    render partial: "show"
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
      :event_date,
      :avatar
      )
  end
end
