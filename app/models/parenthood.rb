class Parenthood < ApplicationRecord
  belongs_to :user
  has_many :logs, dependent: :destroy
  
  validates :plant_name, :date, presence: true

  def next_watering
    d = date.to_date + watering_frequency
    return d.to_s
  end

end
