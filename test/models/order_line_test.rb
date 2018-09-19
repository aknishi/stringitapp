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

require 'test_helper'

class OrderLineTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
