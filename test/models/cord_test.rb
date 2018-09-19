# == Schema Information
#
# Table name: cords
#
#  id          :bigint(8)        not null, primary key
#  brand       :string
#  model       :string
#  gauge       :string           not null
#  length      :integer
#  composition :string           not null
#  color       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class CordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
