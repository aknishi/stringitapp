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

require 'test_helper'

class OrderLineTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
