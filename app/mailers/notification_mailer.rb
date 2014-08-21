class NotificationMailer < ActionMailer::Base
  default from: 'homewardfounddbc@gmail.com'

  def possible_match_notification(user)
    @user = user
    @url = 'http://homeward-found.herokuapp.com'
    mail(to: @user.email, subject: 'Homeward Found: Someone may have located your pet!')
  end
end
