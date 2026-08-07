"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { nanoid } from "nanoid";
import { FiLock, FiUser, FiArrowLeft } from "react-icons/fi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      const unqueId = nanoid(666);
      localStorage.setItem("cache", JSON.stringify(unqueId));
      router.push("/admin");
    } else {
      setError("Invalid username or password.");
    }
  };

  const inputWrap =
    "flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 focus-within:border-accent transition-colors";
  const inputEl = "w-full bg-transparent py-3 text-sm outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl font-bold tracking-tight text-ink">
            Patnaites <span className="text-accent">Media</span>
          </span>
          <p className="mt-1 text-sm uppercase tracking-wider text-muted">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleAdminLogin}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <h1 className="text-xl font-bold text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-muted">
            Enter your admin credentials to continue.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Username
              </label>
              <div className={inputWrap}>
                <FiUser className="text-muted" />
                <input
                  type="text"
                  className={inputEl}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <div className={inputWrap}>
                <FiLock className="text-muted" />
                <input
                  type="password"
                  className={inputEl}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Login
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <FiArrowLeft /> Return to Home
        </Link>
      </div>
    </div>
  );
}
