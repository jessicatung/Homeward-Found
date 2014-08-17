class LostingsController < ApplicationController
  def index

  end

  def new # dont need this later
    @losting = Losting.new
  end

  def create
    losting = Losting.new(strong_params)

    if losting.save
      # trigger search algorithm
      redirect_to root_path
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
    lostings = Losting.ordered_json
    lostings = JSON.parse(lostings)
    render json: lostings
  end

  private

  def strong_params
    params.require(:losting).permit(:pet_name, :animal_type, :size, :breed, :coat_color, :coat_length, :location, :tag, :detail, :date_lost)
  end
end
