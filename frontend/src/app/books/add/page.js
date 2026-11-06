"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import BookForm from "../../../components/BookForm";

import useAuthStore from "../../../store/authStore";
import useBookStore from "../../../store/bookStore";

export default function AddBookPage() {
  const router = useRouter();

  const initialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const addNewBook = useBookStore((state) => state.addNewBook);
  const loading = useBookStore((state) => state.loading);

  const [error, setError] = useState("");

  // Check authentication
  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [initialized, isAuthenticated, router]);

  // Add book
  const handleAddBook = async (bookData) => {
    setError("");

    try {
      await addNewBook(bookData);
      router.push("/books");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add book. Please try again."
      );
    }
  };

  if (!initialized || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-2xl px-5 py-10">
        <Link
          href="/books"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to My Books
        </Link>

        <div className="mb-7 mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Add a Book
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Add a new book to your personal reading list.
          </p>
        </div>

        {error && (
          <p className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <BookForm
          onSubmit={handleAddBook}
          loading={loading}
          buttonText="Add Book"
        />
      </main>
    </>
  );
}