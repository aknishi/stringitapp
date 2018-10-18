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
  name: "Administrator",
  email: "admin@example.com",
  password: "123456",
  phone_number: "000-000-0000",
  address: "",
  comment: "",
  admin: true
)

guest = User.create!(
  name: "Guest",
  email: "guest@example.com",
  password: "123456",
  phone_number: "000-000-0000",
  address: "",
  comment: "",
  admin: false
)

user1 = User.create!(
  name: "Jordan B.",
  email: "jordan8@example.com",
  password: "123456",
  phone_number: "111-111-1111",
  address: "555 2nd Street, San Francisco, CA 94101",
  comment: "great customer",
  admin: false
)

user2 = User.create!(
  name: "John T.",
  email: "john99@example.com",
  password: "123456",
  phone_number: "222-222-2222",
  address: "555 3rd Street, Sunnyvale, CA 94085",
  comment: "Always wants orders delivered.",
  admin: false
)

user3 = User.create!(
  name: "David D.",
  email: "david@example.com",
  password: "123456",
  phone_number: "333-333-3333",
  address: "363 Bush Street, San Diego, CA 92100",
  comment: "important customer",
  admin: false
)

user4 = User.create!(
  name: "Lucas H.",
  email: "lucas@example.com",
  password: "123456",
  phone_number: "444-444-4444",
  address: "465 Violet Ave., Mendocino, CA 94223",
  comment: "",
  admin: false
)

user5 = User.create!(
  name: "Bill B.",
  email: "billy@example.com",
  password: "123456",
  phone_number: "555-555-5555",
  address: "320 Main Street, Orinda, CA 93322",
  comment: "Bad customer",
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

order3 = Order.create!(
  customer_id: guest.id,
  status: "Cancelled",
  comments: "Customer changed his mind"
)

order4 = Order.create!(
  customer_id: guest.id,
  status: "Pending",
  comments: "Customer paid in advance."
)

racket1 = Racket.create!(
  brand: "Yonex",
  model: "Vcore Pro 100",
  color: "Navy / Orange",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=VPRO1H-1.jpg&nw=350"
)

racket2 = Racket.create!(
  brand: "Wilson",
  model: "Blade Team 99 Lite",
  color: "Black / Yellow",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=BT99L-1.jpg&nw=350"
)

racket3 = Racket.create!(
  brand: "Prince",
  model: "Phantom Pro 100",
  color: "Black",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=TPP100-1.jpg&nw=350"
)

racket4 = Racket.create!(
  brand: "Babolat",
  model: "Pure Drive",
  color: "Blue",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=BPD1H-1.jpg&nw=350"
)

racket5 = Racket.create!(
  brand: "Dunlop",
  model: "Srixon Revo CX 2.0",
  color: "Red / Black",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=RCX2-1.jpg&nw=350"
)

string1 = Cord.create!(
  brand: "Wilson",
  model: "Syntheric Gut Power",
  gauge: "16",
  length: 40,
  composition: "Poly-Ether",
  color: "Green",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=WSGP16-GN-1.jpg&nw=300"
)

string2 = Cord.create!(
  brand: "Babolat",
  model: "Addiction",
  gauge: "17",
  length: 40,
  composition: "Multifilament",
  color: "Natural",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=BADD17-1.jpg&nw=300"
)

string3 = Cord.create!(
  brand: "Yonex",
  model: "Rexis",
  gauge: "16",
  length: 39,
  composition: "Multifilament",
  color: "Natural",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=YREX160-1.jpg&nw=300"
)

string4 = Cord.create!(
  brand: "Yonex",
  model: "PolyTour Strike",
  gauge: "16L",
  length: 39,
  composition: "Polyester Monofilament",
  color: "Black",
  image: "https://img.tennis-warehouse.com/watermark/rs.php?path=YPTS16L-1.jpg&nw=300"

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
  order_id: order1.id,
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

order_line4 = OrderLine.create!(
  order_id: order3.id,
  racket_id: racket4.id,
  main_cord_id: string1.id,
  main_tension: 60,
  cross_cord_id: string2.id,
  cross_tension: 55
)

order_line5 = OrderLine.create!(
  order_id: order4.id,
  racket_id: racket4.id,
  main_cord_id: string3.id,
  main_tension: 57,
  cross_cord_id: string3.id,
  cross_tension: 62
)

order_line6 = OrderLine.create!(
  order_id: order4.id,
  racket_id: racket5.id,
  main_cord_id: string2.id,
  main_tension: 66,
  cross_cord_id: string3.id,
  cross_tension: 66
)
