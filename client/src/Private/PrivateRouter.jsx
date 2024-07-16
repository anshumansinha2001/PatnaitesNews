import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Loading/Spinner";
import { nanoid } from "nanoid";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch admin credentials from environment variables
  const adminUsername = String(import.meta.env.VITE_ADMIN_USERNAME);
  const adminPassword = String(import.meta.env.VITE_ADMIN_KEY);

  useEffect(() => {
    // Check for existing admin token in localStorage
    const storedAdmin = JSON.parse(localStorage.getItem("cache"));
    if (storedAdmin?.length === 666) {
      setAdmin(true);
    }
    setLoading(false); // Stop loading once localStorage is checked
  }, []);

  // Function to validate admin login
  const checkAdmin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Compare input credentials with stored admin credentials
    if (username === adminUsername && password === adminPassword) {
      const random = nanoid(666); // Generate unique ID for session
      localStorage.setItem("cache", JSON.stringify(random));
      setAdmin(true);
    } else {
      setShouldNavigate(true);
      alert("Sorry, it seems you're not an admin!");
    }

    setLoading(false);
  };

  // Display loading spinner if still loading
  if (loading) {
    return <Spinner />;
  }

  // Navigate to home if not an admin
  if (shouldNavigate) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render children if admin is authenticated
  if (isAdmin) {
    return children;
  }

  // Render admin login form if not authenticated
  return (
    <div data-theme="light" className="h-screen py-36 px-5">
      <h1 className="text-center text-4xl sm:text-5xl my-4">Admin Login</h1>
      <form
        onSubmit={checkAdmin}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <label className="form-control w-full max-w-xs">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered input-primary w-full max-w-xs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          className={`btn btn-primary ${
            username.trim() === "" || password.trim() === ""
              ? "btn-disabled"
              : ""
          }`}
          disabled={username.trim() === "" || password.trim() === ""}
        >
          Get to the Admin Panel
        </button>
      </form>
    </div>
  );
};

export default PrivateRouter;
