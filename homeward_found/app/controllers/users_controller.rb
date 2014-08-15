class UsersController < ApplicationController

  def new # dont need this later
    @user = User.new
  end

  def create

  end

  private

  def strong_params
    params.require(:user).permit(:email, :password)
  end

end