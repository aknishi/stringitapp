@cords.each do |cord|
  json.set! cord.id do
    json.partial! "api/cords/cord", cord: cord
  end
end
