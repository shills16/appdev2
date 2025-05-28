const express = require("express");
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.post("/", createBook);

router.patch("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;