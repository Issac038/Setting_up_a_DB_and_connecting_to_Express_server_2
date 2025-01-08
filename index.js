const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./schema.js')

const app = express();
const port = 3010;

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('Error connecting to database')
  })

app.use(express.json());

app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(400)
        .json({ message: 'Validation error', details: err.message });
    } else {
      res.status(500).json({ message: 'Server error', details: err.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
