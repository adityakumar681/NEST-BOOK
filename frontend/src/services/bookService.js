import api from "./api";

// Get all books with optional filters
export const getBooks = async (filters = {}) => {
  const response = await api.get("/books", {
    params: filters
  });

  return response.data;
};

// Get a single book
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Add a new book
export const addBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

// Update a book
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

// Delete a book
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};