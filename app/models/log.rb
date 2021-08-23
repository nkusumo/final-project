class Log < ApplicationRecord
    belongs_to :parenthood
    has_one_attached :plant_image

    validates :date, :description, presence: true
end
