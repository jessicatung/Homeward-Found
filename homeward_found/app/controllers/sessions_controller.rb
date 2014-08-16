class SessionsController < ApplicationController

  def create
    user = User.find_by_email(params[:users][:email])
    if user && user.authenticate(params[:users][:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      flash.now.alert = "Invalid email or password"
      redirect_to new_user_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end