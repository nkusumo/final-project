class Parenthood < ApplicationRecord
  belongs_to :user
  has_many :logs, dependent: :destroy

  def next_watering
    d = date.to_date + watering_frequency
    return d.to_s
  end

end
