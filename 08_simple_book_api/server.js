const express = require('express');
const app  = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// Sample data
let books = [
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
    { id: 2, title: 'Stay Awake Agatha', author: 'Serialsleeper' },
    { id: 3, title: 'Detective Files', author: 'Shinichilaaaabs' }
];

// GET all books
app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js and Express');
});
app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
});

app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: 'Title and Author are required' });

    const newBook = {
        id: books.length ? books [books.length - 1].id + 1 : 1, // Incremental ID
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.patch('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(index, 1);
    res.json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});