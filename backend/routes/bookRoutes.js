const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const bookValidator = require("../validators/bookValidator");

const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// to protect all book routes
router.use(authMiddleware);

// to get all books
router.get("/", getBooks);

// Add a new book
router.post("/", bookValidator, validateMiddleware, addBook);

// Get single book
router.get("/:id", getBook);

// to update a book
router.put("/:id", bookValidator, validateMiddleware, updateBook);

// to delete  book
router.delete("/:id", deleteBook);

module.exports = router;