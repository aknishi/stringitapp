# == Schema Information
#
# Table name: rackets
#
#  id         :bigint(8)        not null, primary key
#  brand      :string           not null
#  model      :string           not null
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image      :string
#

require 'test_helper'

class RacketTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
