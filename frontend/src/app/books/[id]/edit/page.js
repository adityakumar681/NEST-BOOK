"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Navbar from "../../../../components/Navbar";
import BookForm from "../../../../components/BookForm";

import { getBookById } from "../../../../services/bookService";
import useAuthStore from "../../../../store/authStore";
import useBookStore from "../../../../store/bookStore";

function EditBookContent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const initialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const editBook = useBookStore((state) => state.editBook);
  const saving = useBookStore((state) => state.loading);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check authentication and fetch book
  useEffect(() => {
    if (!initialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);

        const data = await getBookById(id);
        setBook(data.book);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load book"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id, initialized, isAuthenticated, router]);

  // Update book
  const handleUpdateBook = async (bookData) => {
    setError("");

    try {
      await editBook(id, bookData);
      router.push(`/books/${id}`);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update book"
      );
    }



  };

  if (!initialized || !isAuthenticated || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  if (error && !book) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-2xl px-5 py-16 text-center">
          <h1 className="text-xl font-semibold">
            Unable to load book
          </h1>

          <p className="mt-2 text-sm text-gray-600">{error}</p>

          <Link
            href="/books"
            className="mt-5 inline-block text-sm text-amber-800 hover:underline"
          >
            Back to My Books
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-2xl px-5 py-10">
        <Link
          href={`/books/${id}`}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to Book Details
        </Link>

        <div className="mb-7 mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Edit Book
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Update your book details, reading status or personal notes.
          </p>
        </div>

        {error && (
          <p className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <BookForm
          initialData={book}
          onSubmit={handleUpdateBook}
          loading={saving}
          buttonText="Update Book"
        />
      </main>
    </>
  );
}

export default function EditBookPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading...</div>}>
      <EditBookContent />
    </Suspense>
  );
}