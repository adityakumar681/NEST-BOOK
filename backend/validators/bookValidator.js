const { body } = require("express-validator");

const bookValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Book title is required"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author name is required"),

  body("coverImage")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Please enter a valid cover image URL"),

  body("status")
    .optional()
    .isIn(["Want to Read", "Reading", "Finished"])
    .withMessage("Invalid book status"),

  body("rating")
    .optional({ values: "null" })
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("rating").custom((value, { req }) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      req.body.status !== "Finished"
    ) {
      throw new Error("Rating is only allowed for finished books");
    }

    return true;
  }),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text")
];

module.exports = bookValidator;