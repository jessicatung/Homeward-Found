class UsersController < ApplicationController
  include SessionsHelper

  def new # dont need this later
    @user = User.new
  end

  def create
    @user = User.new(strong_params)
     @user.password_confirmation = @user.password
      if @user.save
        session[:user_id] = @user.id
        # flash[:notice] = "Welcome to the site!"
        redirect_to root_path
      else
        # flash[:alert] = "There was a problem creating your account. Please try again."
        binding.pry
        redirect_to new_user_path
      end
    end

    def login
    end

    private

    def strong_params
      params.require(:user).permit(:email, :password)
    end

  end