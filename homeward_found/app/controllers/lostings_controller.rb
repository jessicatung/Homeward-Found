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
      puts "AJSDFOIJASDIFJWOIJEFOINVIOENIN"
      p algorithm.search
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

  private

  def strong_params
    params.require(:losting).permit(:pet_name, :animal_type, :size, :breed, :coat_color, :coat_length, :location, :tag, :detail, :date_lost)
  end
end
