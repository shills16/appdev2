const Book = require("../models/book.model");
const sendBookConfirmationEmail = require("../middlewares/send-email.middleware");


const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ books: books, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ book: book, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const product = await Book.create(req.body);

    const bookDetails = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
        };

      try {
          const userEmail = req.user.email;
          await sendBookEmail(bookDetails, userEmail);
          res.json({ success: true, message: "New Book Added!" });
      } catch (emailError){
          console.error("Failed to send email after adding book:", emailError);
          res.json({ 
            success: true, 
            message: "New Book is Successfully Added!", 
            book: product,  
          });
        }                    

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) 
      return res.json({ success: false, message: "Book not found!" });

    const updatedBook = await Book.findById(id);
    res.json({ success: true, book: updatedBook });
  } catch (error) {
      res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) 
      return res.json({ success: false, message: "Book not found!" });

    res.json({ success: true, message: "Book is successfully deleted!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};