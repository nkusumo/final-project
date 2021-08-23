class User < ApplicationRecord
    has_secure_password
    has_many :parenthoods

    validates :name, :password, presence: true
    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 4 }

    def my_waterings
        self.parenthoods.map do |p|
            {
                name: p.plant_name,
                scientific_name: p.plant_sci_name,
                date: p.next_watering,
                next_watering: Date.parse(p.next_watering).strftime("%A, %b %d, %Y"),
                due: p.due,
                parenthood_id: p.id
            }
        end
    end

end
