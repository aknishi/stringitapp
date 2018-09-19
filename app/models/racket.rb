# == Schema Information
#
# Table name: rackets
#
#  id         :bigint(8)        not null, primary key
#  brand      :string           not null
#  model      :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Racket < ApplicationRecord
  validates :brand, presence: true

  belongs_to :order_line, optional: true
  has_and_belongs_to_many :users

end
