//Schema of User body

const { Schema } = require('mongoose');

const userSchema = new Schema({
  _id: String,
  login: { type: String, required: true, unique: true },
  email: { type: String }
}, { versionKey: false });

module.exports = { userSchema };
