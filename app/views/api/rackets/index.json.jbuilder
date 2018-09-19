@rackets.each do |racket|
  json.set! racket.id do
    json.partial! "api/rackets/racket", racket: racket
  end
end
