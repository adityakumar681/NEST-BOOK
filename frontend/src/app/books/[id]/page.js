"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Navbar from "../../../components/Navbar";
import { getBookById } from "../../../services/bookService";
import useAuthStore from "../../../store/authStore";

function BookDetailsContent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const initialized = useAuthStore((state) => state.initialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }

    if (initialized && isAuthenticated && id) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          setError("");

          const data = await getBookById(id);
          setBook(data.book);
        } catch (error) {
          setError(
            error.response?.data?.message || "Failed to load book details"
          );
        } finally {
          setLoading(false);
        }
      };

      fetchBook();
    }
  }, [id, initialized, isAuthenticated, router]);

  if (!initialized || !isAuthenticated || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Loading book details...
      </div>
    );
  }


  if (error || !book) {
    return (
      <>
        <Navbar />

        <main className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h1 className="text-xl font-semibold">
            Book not found
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {error || "This book could not be found."}
          </p>

          <Link
            href="/books"
            className="mt-6 inline-block text-sm font-medium text-amber-800 hover:underline"
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

      <main className="mx-auto max-w-4xl px-5 py-10">
        <Link
          href="/books"
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back to My Books
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr]">

          {/* Book Cover */}
          <div className="flex h-80 items-center justify-center overflow-hidden rounded-lg bg-stone-100">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="text-sm text-gray-400">
                No cover available
              </p>
            )}
          </div>

          {/* Book Information */}
          <div>
            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-gray-700">
              {book.status}
            </span>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight">
              {book.title}
            </h1>

            <p className="mt-2 text-base text-gray-600">
              by {book.author}
            </p>

            {book.status === "Finished" && book.rating && (
              <p className="mt-5 text-sm font-medium text-amber-700">
                ★ {book.rating}/5
              </p>
            )}

            <div className="mt-8 border-t border-stone-200 pt-6">
              <h2 className="font-semibold">
                Personal Notes
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {book.notes || "No personal notes added yet."}
              </p>
            </div>

            <Link
              href={`/books/${book._id}/edit`}
              className="mt-8 inline-block rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-700"
            >
              Edit Book
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default function BookDetailsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-gray-500">Loading...</div>}>
      <BookDetailsContent />
    </Suspense>
  );
}