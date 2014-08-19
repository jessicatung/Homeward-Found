class NotificationMailer < ActionMailer::Base
  # You have to be careful with these.  All of these are config variables that
  # should be gotten out of the ENV or out of a config YAML.  coding these
  # strings ("magic strings") makes it hard to change things.
  default from: 'homewardfounddbc@gmail.com' # make a constant in this class

  def possible_match_notification(user)
    @user = user
    @url = 'http://homeward-found.herokuapp.com' # make a constant in this class
    mail(to: @user.email, subject: 'Homeward Found: Someone may have located your pet!') # make a constant in this class
  end
end
