class User < ApplicationRecord
    has_secure_password
    has_many :parenthoods

    def my_waterings
        self.parenthoods.map do |p|
            {
                name: p.plant_name,
                scientific_name: p.plant_sci_name,
                next_watering: p.next_watering
            }
        end
    end

end
