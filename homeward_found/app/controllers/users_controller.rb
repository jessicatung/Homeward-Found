class UsersController < ApplicationController
  include SessionsHelper

  def new # dont need this later
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      # redirect_to root_path
    else
      # redirect_to :back
    end
  end

  def login
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
