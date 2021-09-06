const express = require('express');
const cors = require('cors');
const sio = require('socket.io');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2000;
const {
  join_room_user,
  get_current_user,
  disconnect_user,
} = require('./helpers/dummyUser');

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.json({ status: true, data: 'success test data' });
});

const server = app.listen(port, console.log(`Server connected. ${port}`));

const io = sio(server);

io.on('connection', (socket) => {
  socket.on('joinRoom', (username, roomname) => {
    const user = join_room_user(socket.id, username, roomname);
    console.log(socket.id);
    socket.join(user.room);

    socket.emit('message', {
      userId: user.id,
      username: user.username,
      text: `Welcome ${user.username}`,
    });

    socket.broadcast.to(user.room).emit('message', {
      userId: user.id,
      username: user.username,
      text: `${user.username}, was joined room ${user.room}`,
    });

    socket.on('chat', (text) => {
      const user = get_current_user(socket.id);
      io.to(user.room).emit('message', {
        userId: user.id,
        username: user.username,
        text,
      });
    });

    socket.on('disconnect', () => {
      const user = disconnect_user(socket.id);
      if (user) {
        io.to(user.room).emit('message', {
          userId: user.id,
          username: user.username,
          text: `${user.username}, has left the room`,
        });
      }
    });
  });
});
