"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import useAuthStore from "../../store/authStore";

export default function SignupPage() {
  const router = useRouter();

  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup({ name, email, password });
      router.push("/books");
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-[80vh] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Start keeping track of your reading journey.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-lg border border-stone-200 bg-white p-6 sm:p-8"
          >
            {error && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
                className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-amber-800 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}