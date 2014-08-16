class UsersController < ApplicationController
  include SessionsHelper

  def new # dont need this later
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
        redirect_to root_path
      else
        # flash[:alert] = "There was a problem creating your account. Please try again."
        redirect_to new_user_path
      end
    end

    def login
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

  end