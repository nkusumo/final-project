class ParenthoodSerializer < ActiveModel::Serializer
  attributes :id, :date, :watering_frequency, :image
  belongs_to :plant
  belongs_to :user
end
