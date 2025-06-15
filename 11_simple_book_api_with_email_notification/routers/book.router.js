const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const sendBookEmail = require("../middlewares/send-email.middleware");

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.post("/", createBook);

router.patch("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;