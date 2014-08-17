class LostingsController < ApplicationController
  def index

  end

  def new # dont need this later
    @losting = Losting.new
  end

  def create
    losting = Losting.new(strong_params)

    if losting.save
      algorithm = Algorithm.new(losting, Sighting.all)
      render json: algorithm.search
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
    params.require(:losting).permit(:pet_name, :animal_type, :size, :breed, :coat_color, :coat_length, :location, :tag, :detail, :date_lost, :avatar)
  end
end
