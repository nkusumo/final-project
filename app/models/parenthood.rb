class Parenthood < ApplicationRecord
  belongs_to :user
  has_many :logs, dependent: :destroy
  has_one_attached :plant_image
  
  validates :plant_name, :date, presence: true

  def next_watering
    d = date.to_date + watering_frequency
    return d.to_s
  end

  def due
    d = self.next_watering.to_date
    if d < Date.today
      'overdue'
    elsif d == Date.today
      'today'
    else
      'ok'
    end
  end

end
