class UsersController < ApplicationController

  def new # dont need this later
    @user = User.new
  end

  def create
    user = User.new(strong_params)

    if user.save
      session[:user_id] = user.id
      redirect_to root_path
    else
      # flash[:error]

      redirect_to new_user_path
    end

  end

  def login
    # verify
  end

  private

  def strong_params
    params.require(:user).permit(:email, :password)
  end

end