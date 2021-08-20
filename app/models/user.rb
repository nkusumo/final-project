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
                next_watering: p.next_watering,
                due: p.due
            }
        end
    end

end
