//Mongoose connection

const mongoose = require('mongoose');

const {userSchema} = require('./user');

const {
  MONGO_HOST,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASSWORD,
} = require('../config.json');

const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url).then(() => console.log(`Successful connection to ${MONGO_HOST}`));

const Users = mongoose.model('User', userSchema)

module.exports = { Users };