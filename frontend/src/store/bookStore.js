import { create } from "zustand";

import {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} from "../services/bookService";

const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,

  search: "",
  status: "",

  // Update search
  setSearch: (search) => set({ search }),

  // Update status filter
  setStatus: (status) => set({ status }),

  // Fetch all books
  fetchBooks: async () => {
    set({ loading: true, error: null });

    try {
      const filters = {};

      if (get().search.trim()) {
        filters.search = get().search.trim();
      }

      if (get().status) {
        filters.status = get().status;
      }

      const data = await getBooks(filters);

      set({ books: data.books });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch books"
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Add book
  addNewBook: async (bookData) => {
    set({ loading: true, error: null });

    try {
      const data = await addBook(bookData);

      set((state) => ({
        books: [data.book, ...state.books]
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add book"
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Update book
  editBook: async (id, bookData) => {
    set({ loading: true, error: null });

    try {
      const data = await updateBook(id, bookData);

      set((state) => ({
        books: state.books.map((book) =>
          book._id === id ? data.book : book
        )
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update book"
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Delete book
  removeBook: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteBook(id);

      set((state) => ({
        books: state.books.filter((book) => book._id !== id)
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete book"
      });

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null })
}));

export default useBookStore;