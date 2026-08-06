import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5 text-center">
      <p className="font-serif text-8xl font-bold text-accent md:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Oops! Page not found.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
      >
        <span aria-hidden>←</span> Go back to homepage
      </Link>
    </div>
  );
}
