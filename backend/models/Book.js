const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    coverImage: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["Want to Read", "Reading", "Finished"],
      default: "Want to Read"
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;