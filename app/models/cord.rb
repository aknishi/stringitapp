# == Schema Information
#
# Table name: cords
#
#  id          :bigint(8)        not null, primary key
#  brand       :string           not null
#  model       :string           not null
#  gauge       :string           not null
#  length      :integer
#  composition :string           not null
#  color       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image       :string           default("")
#

class Cord < ApplicationRecord
  validates :brand, :model, :gauge, :composition, :color, presence: true
  validates :model, uniqueness: { scope: [:brand, :gauge, :length, :composition, :color] }

  has_many :order_lines1, foreign_key: :main_cord_id, class_name: 'OrderLine'
  has_many :order_lines2, foreign_key: :cross_cord_id, class_name: 'OrderLine'

  after_initialize :set_defaults

  def set_defaults
    self.image ||= ""
  end

end
