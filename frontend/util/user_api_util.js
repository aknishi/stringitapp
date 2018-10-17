export const fetchUsers = data => (
  $.ajax({
    method: 'GET',
    url: 'api/users',
    data
  })
);

export const fetchUser = id => (
  $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  })
);

export const updateUser = user => (
  $.ajax({
    method: 'PATCH',
    url: `api/users/${user.id}`,
    data: { user }
  })
);

export const createUser = user => (
  $.ajax({
    method: 'POST',
    url: 'api/users',
    data: { user }
  })
);
