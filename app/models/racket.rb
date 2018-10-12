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
  validates :brand, :model, presence: true

  has_many :order_lines, foreign_key: :racket_id, class_name: 'OrderLine'
  has_and_belongs_to_many :users

  after_initialize :set_defaults

  def set_defaults
    self.image ||= ""
  end

end
