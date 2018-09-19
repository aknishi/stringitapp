# == Schema Information
#
# Table name: order_lines
#
#  id            :bigint(8)        not null, primary key
#  racket_id     :integer          not null
#  main_cord_id  :integer          not null
#  cross_cord_id :integer          not null
#  main_tension  :integer          not null
#  cross_tension :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  order_id      :integer          not null
#

class OrderLine < ApplicationRecord
  validates :main_tension, presence: true
  validates :cross_tension, presence: true

  belongs_to :order

  has_one :racket, foreign_key: :racket_id, class_name: 'Racket'

  has_one :main_cord, class_name: 'Cord'
  has_one :cross_cord, class_name: 'Cord'

end
