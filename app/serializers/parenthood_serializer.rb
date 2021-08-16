class ParenthoodSerializer < ActiveModel::Serializer
  attributes :id, :date, :watering_frequency, :image, :plant_name, :plant_sci_name, :next_watering
  belongs_to :user
  has_many :logs

  def next_watering
    d = object.date.to_date + object.watering_frequency
    return d.to_s
  end
end
