export const createRacket = racket => (
  $.ajax({
    method: 'POST',
    url: 'api/rackets',
    data: racket
  })
);

export const updateRacket = racket => (
  $.ajax({
    method: 'PATCH',
    url: `api/rackets/${racket.id}`,
    data: { racket }
  })
);

export const fetchRackets = () => (
  $.ajax({
    method: 'GET',
    url: 'api/rackets'
  })
);

export const fetchRacket = id => (
  $.ajax({
    method: 'GET',
    url: `api/rackets/${id}`
  })
);
