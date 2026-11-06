"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initialized = useAuthStore((state) => state.initialized);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between border-b border-stone-200 px-6 py-4 md:px-12">
      <Link href="/" className="text-2xl font-semibold">
        BookNest<span className="text-amber-700">.</span>
      </Link>

      <div className="flex items-center gap-5">
        {!initialized ? null : isAuthenticated ? (
          <>
            <Link
              href="/books"
              className="text-sm text-gray-700 hover:text-black"
            >
              My Books
            </Link>

            <span className="hidden text-sm text-gray-600 sm:block">
              Hi, {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-black"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}