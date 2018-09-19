# == Schema Information
#
# Table name: cords
#
#  id            :bigint(8)        not null, primary key
#  brand         :string
#  model         :string
#  gauge         :string           not null
#  length        :integer
#  composition   :string           not null
#  color         :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  order_line_id :integer
#

class Cord < ApplicationRecord
  validates :gauge, :composition, presence: true

  belongs_to :order_line, optional: true

end
