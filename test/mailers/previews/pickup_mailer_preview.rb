# Preview all emails at http://localhost:3000/rails/mailers/pickup_mailer
class PickupMailerPreview < ActionMailer::Preview
  def pickup_email
    PickupMailer.with(user: User.last).pickup_email
  end
end
