class PickupMailer < ApplicationMailer

  def pickup_email
    @user = params[:user]
    # @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Your tennis racket order is ready for pickup!')
  end
end
