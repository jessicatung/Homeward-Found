class LostingController < ApplicationController
  def index
    @lostings = Losting.all
  end

  def new
    @losting = Losting.new
  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def strong_params
    params.require(:losting).permit(:name, :type, :size, :breed, :coat_type, :coat_length, :location, :tag, :detail, :date_lost)
  end
end