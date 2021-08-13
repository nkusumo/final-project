class Plant < ApplicationRecord
    has_many :parenthoods
    has_many :users, through: :parenthoods
end
