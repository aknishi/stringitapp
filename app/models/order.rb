# == Schema Information
#
# Table name: orders
#
#  id           :bigint(8)        not null, primary key
#  order_number :integer          not null
#  customer_id  :integer          not null
#  status       :string           default("Pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  comments     :text
#

class Order < ApplicationRecord

  STATUS_OPTIONS = %w(Pending Cancelled In_Progress Ready Picked_up)
  validates :order_number, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :status, inclusion: STATUS_OPTIONS

  belongs_to :customer, class_name: 'User'
  has_many :order_lines, foreign_key: :order_id, dependent: :destroy;

  has_many :rackets,
    through: :order_lines,
    source: :racket

  has_many :main_cords,
    through: :order_lines,
    source: :main_cord

  has_many :cross_cords,
    through: :order_lines,
    source: :cross_cord

  after_initialize :ensure_order_number

  def self.generate_order_number
    # generate an 10-digit order number with current time
    order_number = Time.now.to_formatted_s(:number)[2...-2].to_i
    # if order number exists add 1 to order
    while (Order.exists?(order_number: order_number))
      order_number += 1
    end
    return order_number
  end

  private

  def ensure_order_number
    self.order_number ||= Order.generate_order_number
  end

end
