const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config({
  path: './.env',
});

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection Success!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/api', roomRoute);

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: [process.env.CLIENT],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.emit('message', 'Welcome to chat!');

  socket.broadcast.emit('message', 'A User has joined the chat');

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat!');
  });

  socket.on('chatMessage', (msg) => {
    io.emit('message', msg.toString());
  });
});

const PORT = 8000;

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
