export const createCord = cord => (
  $.ajax({
    method: 'POST',
    url: 'api/cords',
    data: cord
  })
);

export const updateCord = cord => (
  $.ajax({
    method: 'PATCH',
    url: `api/cords/${cord.id}`,
    data: { cord }
  })
);

export const fetchCords = () => (
  $.ajax({
    method: 'GET',
    url: 'api/cords'
  })
);

export const fetchCord = id => (
  $.ajax({
    method: 'GET',
    url: `api/cords/${id}`
  })
);
