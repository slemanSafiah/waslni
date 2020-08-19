const express = require('express');
const mongoose = require('mongoose');
const Login = require('./routes/login');
const Register = require('./routes/register');
const Driver = require('./routes/driver');
const User = require('./routes/user');
const Trip = require('./routes/trip');
const Contact_us = require('./routes/contact_us');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const app = express();

app.use(cors());

require('dotenv/config');

app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('trip', (data) => {
    socket.emit('notification', 'abc');
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('connected to DB')
);

mongoose.connection.on("error", () => {
  console.log("error from server");
});

app.use('/login', Login);
app.use('/register', Register);
app.use('/driver', Driver);
app.use('/user', User);
app.use('/contact_us', Contact_us);
app.use('/trip', Trip);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("running on port 5000"));
