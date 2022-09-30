// Instead pure array we should use our database or redis etc.
const users = [];

// Join user to chat
export const newUser = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
export const getActiveUser = (id) => {
  return users.find(user => user.id === id);
}

// User leaves chat
export const exitRoom = (id) => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
export const getIndividualRoomUsers = (room) => {
  return users.filter(user => user.room === room);
}