import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-stone-200 px-6 py-5 md:px-12">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          BookNest<span className="text-amber-700">.</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-28 text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-widest text-amber-700">
          Your personal reading space
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Every book has a place in your reading journey.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
          Keep track of the books you want to read, the ones you are
          reading, and the stories you have finished. All in one place.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-700"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-stone-300 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-stone-100"
          >
            I already have an account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-stone-200 bg-white px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          <div>
            <h2 className="font-semibold">Want to Read</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Save books you plan to read next.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Currently Reading</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Keep track of what you are reading.
            </p>
          </div>

          <div>
            <h2 className="font-semibold">Finished</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Rate completed books and save your thoughts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 py-6 text-center text-sm text-gray-500">
        BookNest — A little space for your reading journey.
      </footer>
    </main>
  );
}