class Parenthood < ApplicationRecord
  belongs_to :plant
  belongs_to :user
  has_many :logs, dependent: :destroy
end
