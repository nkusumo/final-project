class User < ApplicationRecord
    has_secure_password
    has_many :parenthoods
    has_many :plants, through: :parenthoods
end
