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

require 'test_helper'

class CordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
