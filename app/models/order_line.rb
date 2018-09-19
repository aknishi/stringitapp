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

  belongs_to :racket
  belongs_to :main_cord, class_name: 'Cord'
  belongs_to :cross_cord, class_name: 'Cord'

end
