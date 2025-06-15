const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please enter book author"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Please enter book publication year"],
      trim: true,
      min: 1450, // The first printed book was published around 1450
      max: new Date().getFullYear(), // Current year
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;