class StatusNotificationMailer < ActionMailer:: Base
  default to: "adriankawanishi@gmail.com"


def status_notification_email(name, email, body)
  @name = name
  @email = email
  @body = body

  mail(from: email, subject: "Racket Status Message")
end
