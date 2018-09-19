# == Schema Information
#
# Table name: order_lines
#
#  id            :bigint(8)        not null, primary key
#  order_id      :integer          not null
#  racket_id     :integer          not null
#  main_cord_id  :integer
#  cross_cord_id :integer
#  main_tension  :integer          not null
#  cross_tension :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class OrderLine < ApplicationRecord
  validates :racket_id, presence: true
  validates :main_tension, presence: true
  validates :cross_tension, presence: true

  belongs_to :order

  belongs_to :racket
  belongs_to :main_cord, class_name: 'Cord', optional: true
  belongs_to :cross_cord, class_name: 'Cord', optional: true

end
