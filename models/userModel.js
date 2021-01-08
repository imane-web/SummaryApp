const mongoose = require("mongoose");

const userSchema1 = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
});

module.exports = User1 = mongoose.model("utilisteur", userSchema1);
