const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
      trim: true,
      minlength: 3,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      trim: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);

module.exports = users;