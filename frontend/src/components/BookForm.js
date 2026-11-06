"use client";

import { useState } from "react";

export default function BookForm({
  initialData = {},
  onSubmit,
  loading = false,
  buttonText = "Save Book"
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    coverImage: initialData.coverImage || "",
    status: initialData.status || "Want to Read",
    rating: initialData.rating ?? "",
    notes: initialData.notes || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;

    setFormData({
      ...formData,
      status,
      rating: status === "Finished" ? formData.rating : ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      rating:
        formData.status === "Finished" && formData.rating !== ""
          ? Number(formData.rating)
          : null
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-stone-200 bg-white p-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Book Title *
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter book title"
          className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Author *
        </label>

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Enter author name"
          className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Cover Image URL
        </label>

        <input
          type="url"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="https://example.com/book.jpg"
          className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Reading Status *
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleStatusChange}
          className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-800"
        >
          <option value="Want to Read">Want to Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>

      {formData.status === "Finished" && (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Rating (1–5)
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-800"
          >
            <option value="">Select rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Personal Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Write your thoughts about this book..."
          className="w-full resize-y rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}