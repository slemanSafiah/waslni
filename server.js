const express = require('express');
const mongoose = require('mongoose');
const Login = require('./routes/login');
const Register = require('./routes/register');
const Driver = require('./routes/driver');
const User = require('./routes/user');
const cors = require('cors');


const app = express();

app.use(cors())

require('dotenv/config');

app.use(express.json());

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
app.user('/user', User);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("running on port 5000"));
