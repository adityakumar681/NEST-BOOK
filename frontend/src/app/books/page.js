"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import BookCard from "../../components/BookCard";

import useAuthStore from "../../store/authStore";
import useBookStore from "../../store/bookStore";

export default function BooksPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useAuthStore((state) => state.initialized);

  const books = useBookStore((state) => state.books);
  const loading = useBookStore((state) => state.loading);
  const error = useBookStore((state) => state.error);

  const search = useBookStore((state) => state.search);
  const status = useBookStore((state) => state.status);

  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const removeBook = useBookStore((state) => state.removeBook);
  const setSearch = useBookStore((state) => state.setSearch);
  const setStatus = useBookStore((state) => state.setStatus);
  const clearError = useBookStore((state) => state.clearError);

  const [searchInput, setSearchInput] = useState(search);

  // Redirect if user is not logged in
  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [initialized, isAuthenticated, router]);

  // Fetch books when authentication or filters change
  useEffect(() => {
    if (initialized && isAuthenticated) {
      fetchBooks();
    }
  }, [initialized, isAuthenticated, search, status, fetchBooks]);

  // Search books
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await removeBook(id);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  // Wait for authentication check
  if (!initialized || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Loading your library...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10 md:px-8">

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-gray-500">
              Welcome back, {user?.name}
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              My Books
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Your personal collection of books.
            </p>
          </div>

          <Link
            href="/books/add"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            + Add a Book
          </Link>
        </div>

        {/* Search and filter */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <form onSubmit={handleSearch} className="flex flex-1 gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title or author..."
              className="min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-800"
            />

            <button
              type="submit"
              className="rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-stone-100"
            >
              Search
            </button>
          </form>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-gray-800"
          >
            <option value="">All Books</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-5 flex items-center justify-between rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>{error}</p>

            <button
              onClick={clearError}
              className="font-medium underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            Loading books...
          </div>
        ) : books.length === 0 ? (

          /* Empty state */
          <div className="py-24 text-center">
            <h2 className="text-xl font-semibold">
              No books found
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {search || status
                ? "Try changing your search or filter."
                : "Your reading list is empty. Add your first book to get started."}
            </p>

            {!search && !status && (
              <Link
                href="/books/add"
                className="mt-6 inline-block rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
              >
                Add Your First Book
              </Link>
            )}

            {(search || status) && (
              <button
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setStatus("");
                }}
                className="mt-5 text-sm font-medium text-amber-800 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

        ) : (

          /* Book list */
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}