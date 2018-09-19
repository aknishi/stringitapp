# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  name            :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  phone_number    :string           not null
#  address         :string
#  comment         :text
#  admin           :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/, message: "bad format" }
  validates :admin, inclusion: { in: [true, false] }

  has_many :orders
  has_and_belongs_to_many :rackets
  has_many :order_lines, through: :orders, source: :order_lines

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)
    user
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def self.all_customers
    customers = User.all.where(admin: false)
  end
end
