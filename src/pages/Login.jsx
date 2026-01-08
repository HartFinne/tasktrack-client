import { useState } from "react";
import { login } from "../api/loginApi.js";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // Redirect based on role
  if (user) {
    if (user.role === "employee") return <Navigate to="/dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />;
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    // Call the login api
    const result = await login(email, password)

    if (!result.success) {
      setError("auth credential invalid " + result.error)
      return
    }

    alert("Account login successfully!");
    console.log("User UID:", result.uid);

    {/* Restart all the input in form */ }
    setEmail("")
    setPassword("")
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">TaskTrack</h1>
          <p className="text-gray-600 mt-2 text-lg">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>

          {/* Email Input */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-base text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;

