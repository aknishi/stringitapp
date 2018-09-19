# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.delete_all
Order.delete_all
OrderLine.delete_all
Racket.delete_all
Cord.delete_all

admin = User.create!(
  name: "Adrian K.",
  email: "adrian@example.com",
  password: "123456",
  phone_number: "111-111-1111",
  address: "",
  comment: "",
  admin: true
)

user1 = User.create!(
  name: "Jordan B.",
  email: "jordan8@example.com",
  password: "123456",
  phone_number: "555-555-5555",
  address: "555 2nd Street, San Francisco, CA 94101",
  comment: "great customer",
  admin: false
)

user2 = User.create!(
  name: "John T.",
  email: "john99@example.com",
  password: "123456",
  phone_number: "333-333-3333",
  address: "555 3rd Street, Sunnyvale, CA 94085",
  comment: "Always wants orders delivered.",
  admin: false
)

order1= Order.create!(
  customer_id: user1.id,
  status: "Pending",
  comments: "The Yonex Vcore Pro 100 racket is urgent. The other one is not."
)

order2 = Order.create!(
  customer_id: user2.id,
  status: "Ready",
  comments: "Needs Racket by October 15"
)

racket1 = Racket.create!(
  brand: "Yonex",
  model: "Vcore Pro 100",
  color: "navy / orange"
)

racket2 = Racket.create!(
  brand: "Wilson",
  model: "Blade Team 99 Lite",
  color: "black / yellow"
)

racket3 = Racket.create!(
  brand: "Prince",
  model: "Phantom Pro 100",
  color: "black"
)

string1 = Cord.create!(
  brand: "Wilson",
  model: "Duo Power Hybrid",
  gauge: "16",
  length: 40,
  composition: "Poly-Ether",
  color: "green"
)

string2 = Cord.create!(
  brand: "Babolat",
  model: "Addiction",
  gauge: "17",
  length: 40,
  composition: "Multifilament",
  color: "natural"
)

string3 = Cord.create!(
  brand: "Yonex",
  model: "Rexis",
  gauge: "16",
  length: 39,
  composition: "Multifilament",
  color: "natural"
)

string4 = Cord.create!(
  brand: "Yonex",
  model: "PolyTour Strike",
  gauge: "16L",
  length: 39,
  composition: "Polyester Monofilament",
  color: "black"
)

order_line1 = OrderLine.create!(
  order_id: order1.id,
  racket_id: racket1.id,
  main_cord_id: string1.id,
  main_tension: 55,
  cross_cord_id: string2.id,
  cross_tension: 50
)

order_line2 = OrderLine.create!(
  order_id: order2.id,
  racket_id: racket2.id,
  main_cord_id: string3.id,
  main_tension: 55,
  cross_cord_id: string3.id,
  cross_tension: 60
)

order_line3 = OrderLine.create!(
  order_id: order2.id,
  racket_id: racket3.id,
  main_cord_id: string2.id,
  main_tension: 53,
  cross_cord_id: string3.id,
  cross_tension: 58
)
