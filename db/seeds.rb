puts "destroying old entries..."

Log.destroy_all
Parenthood.destroy_all
Plant.destroy_all
User.destroy_all

Log.reset_pk_sequence
Parenthood.reset_pk_sequence
Plant.reset_pk_sequence
User.reset_pk_sequence

puts "seeding users..."
User.create(name: "Nisa", username: "nis123", password: "1234")
names = []
10.times {names.push(Faker::Name.first_name)}
names.each {|user| User.create(name: user, username: "#{user}#{rand(1..100)}", password: "1234")}

# puts "seeding plants..."
# Plant.create(name: "Bird of Paradise", scientific_name: "Strelitzia reginae")
# Plant.create(name: "Parlor Palm", scientific_name: "Chamaedorea elegans")
# Plant.create(name: "Monstera", scientific_name: "Monstera deliciosa")
# Plant.create(name: "Variegated Rubber Tree", scientific_name: "Ficus elastica 'Tineke'")
# Plant.create(name: "Chinese Money Plant", scientific_name: "Pilea peperomioides")
# Plant.create(name: "Fiddle Leaf Fig", scientific_name: "Ficus lyrata")
# Plant.create(name: "Snake Plant", scientific_name: "Sansevieria trifasciata")
# Plant.create(name: "Pothos", scientific_name: "Epipremnum aureum")
# Plant.create(name: "ZZ Plant", scientific_name: "Zamioculcas zamiifolia")
plants = [
    {name: "Bird of Paradise", scientific_name: "Strelitzia reginae"}, 
    {name: "Parlor Palm", scientific_name: "Chamaedorea elegans"},
    {name: "Monstera", scientific_name: "Monstera deliciosa"},
    {name: "Variegated Rubber Tree", scientific_name: "Ficus elastica 'Tineke'"},
    {name: "Chinese Money Plant", scientific_name: "Pilea peperomioides"},
    {name: "Fiddle Leaf Fig", scientific_name: "Ficus lyrata"},
    {name: "Snake Plant", scientific_name: "Sansevieria trifasciata"},
    {name: "Pothos", scientific_name: "Epipremnum aureum"},
    {name: "ZZ Plant", scientific_name: "Zamioculcas zamiifolia"}
]

puts "seeding parenthoods..."
images = [
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bird-of-paradise_variant_medium_grant_cream.jpg?v=1627570027",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_variant_medium_hyde_cream_56e911fc-1f4e-4a1b-8722-e4a36960c052_1200x.jpg?v=1627304109",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_hyde_cream_50145be1-5183-4692-80ed-a927d5625fc8_1200x.jpg?v=1627303458",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-tineke_variant_medium_grant_terracotta_1200x.jpg?v=1626701080",
    "https://cdn.shopify.com/s/files/1/0150/6262/files/the-sill_pilea_variant_x-small_grant_mint_2048x2048.jpg?v=1620761976",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_fiddle-leaf-fig_medium_grant_navy.jpg?v=1628515598",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_grant_cream_1200x.jpg?v=1626702308",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_marble-queen-pothos_small_grant_cream.jpg?v=1628258113",
    "http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_zz-plant_variant_medium_grant_mint_1200x.jpg?v=1627303858"
]
(1..9).each do |i|
    Parenthood.create(user_id: 1, date: Faker::Date.between(from: 1.year.ago, to: Date.today), watering_frequency: rand(4..30), image: images[i-1], plant_name: plants[i-1][:name], plant_sci_name: plants[i-1][:scientific_name])
end
(1..9).each do |i|
    Parenthood.create(user_id: User.ids.sample, date: Faker::Date.between(from: 1.year.ago, to: Date.today), watering_frequency: rand(4..30), image: images[i-1], plant_name: plants[i-1][:name], plant_sci_name: plants[i-1][:scientific_name])
end

puts "seeding logs..."
(1..9).each do |i|
    Log.create(description: "so much growth!", date: Faker::Date.between(from: 1.year.ago, to: Date.today), parenthood_id: i, image: images[i-1])
end
(1..9).each do |i|
    Log.create(description: "so much growth!", date: Faker::Date.between(from: 1.year.ago, to: Date.today), parenthood_id: i, image: images[i-1])
end
10.times do
    Log.create(description: "so much growth!", date: Faker::Date.between(from: 1.year.ago, to: Date.today), parenthood_id: Parenthood.ids.sample)
end