class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create

  end

  private

  def strong_params
    params.require(:user).permit(:email, :password)
  end

end