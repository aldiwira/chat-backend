const c_user = [];

const join_room_user = (id, username, room) => {
  const i_user = { id, username, room };
  c_user.push(i_user);
  return i_user;
};

const get_current_user = (id) => {
  return c_user.find((user) => user.id == id);
};

const disconnect_user = (id) => {
  const index = c_user.findIndex((user) => user.id == id);
  if (index !== 1) {
    return c_user.splice(index, 1)[0];
  }
};

module.exports = {
  join_room_user,
  get_current_user,
  disconnect_user,
};
