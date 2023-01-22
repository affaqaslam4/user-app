const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  isAdmin: Boolean,
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
