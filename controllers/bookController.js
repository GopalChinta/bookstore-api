const fs = require("fs/promises");
const path = require("path");

const booksPath = path.join(__dirname, "../data/books.json");

// Helper to read books
async function readBooks() {
  const data = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(data);
}

// Helper to write books
async function writeBooks(books) {
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
}

// GET /books - Get all books
const getBooks = async (req, res, next) => {
  try {
    const books = await readBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// GET /books/:id - Get book by ID
const getBookById = async (req, res, next) => {
  try {
    const books = await readBooks();
    const book = books.find((b) => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// POST /books - Add a new book
const addBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const books = await readBooks();
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
    };

    books.push(newBook);
    await writeBooks(books);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

// PUT /books/:id - Update a book
const updateBook = async (req, res, next) => {
  try {
    const { title, author } = req.body;
    const books = await readBooks();
    const index = books.findIndex((b) => b.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    books[index] = {
      ...books[index],
      title: title || books[index].title,
      author: author || books[index].author,
    };

    await writeBooks(books);
    res.json(books[index]);
  } catch (err) {
    next(err);
  }
};

// DELETE /books/:id - Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const books = await readBooks();
    const updatedBooks = books.filter((b) => b.id !== req.params.id);

    if (books.length === updatedBooks.length) {
      return res.status(404).json({ error: "Book not found" });
    }

    await writeBooks(updatedBooks);
    res.json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};


