class SessionsController < ApplicationController

  def create
    user = User.where(email: params[:user][:email]).first
    if user.password == params[:user][:password]
      session[:user_id] = user.id
    end

    if session[:user_id] != nil
      redirect_to root_path
    else
     flash[:error_log] = "Your username or password is incorrect!"
     redirect_to login_path
   end
 end

 def destroy
  session[:user_id] = nil
  redirect_to root_path
 end

end