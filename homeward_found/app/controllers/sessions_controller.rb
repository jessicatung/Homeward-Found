class SessionsController < ApplicationController

  def create
    @user = User.authenticate(params[:email], params[:password])
    if @user
      flash[:notice] = "You've been logged in."
      session[:user_id] = @user.id
      redirect_to root_path
    else
      flash[:alert] = "There was a problem logging you in."
      redirect_to new_user_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end