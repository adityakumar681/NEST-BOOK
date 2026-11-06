const Book = require("../models/Book");
const AppError = require("../utils/AppError");

// Add new book
const addBook = async (req, res, next) => {
  try {
    const { title, author, coverImage, status, rating, notes } = req.body;

    const book = await Book.create({
      userId: req.user._id,
      title,
      author,
      coverImage,
      status,
      rating,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book
    });
  } catch (error) {
    next(error);
  }
};

// Get all books
const getBooks = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    const filter = {
      userId: req.user._id
    };

    // Filter books by reading status
    if (status) {
      const validStatuses = ["Want to Read", "Reading", "Finished"];

      if (!validStatuses.includes(status)) {
        return next(new AppError("Invalid book status", 400));
      }

      filter.status = status;
    }

    // Search by title or by author
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } }
      ];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    next(error);
  }
};

// Get a single book
const getBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    next(error);
  }
};

// Update a book
const updateBook = async (req, res, next) => {
  try {
    const { title, author, coverImage, status, rating, notes } = req.body;

    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      {
        title,
        author,
        coverImage,
        status,
        rating,
        notes
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    next(error);
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
};