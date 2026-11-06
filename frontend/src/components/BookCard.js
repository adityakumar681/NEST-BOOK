import Link from "next/link";

export default function BookCard({ book, onDelete }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmed) {
      onDelete(book._id);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link href={`/books/${book._id}`}>
        <div className="flex h-52 items-center justify-center bg-stone-100">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-sm text-gray-400">
              No cover available
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="truncate font-semibold text-gray-900">
          {book.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {book.author}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-gray-700">
            {book.status}
          </span>

          {book.status === "Finished" && book.rating && (
            <span className="text-sm text-amber-700">
              ★ {book.rating}/5
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
          <Link
            href={`/books/${book._id}/edit`}
            className="text-sm font-medium text-gray-700 hover:text-amber-800"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}