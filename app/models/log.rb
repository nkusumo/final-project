class Log < ApplicationRecord
    belongs_to :parenthood

    validates :date, :description, presence: true
end
