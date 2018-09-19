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

require 'test_helper'

class OrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
