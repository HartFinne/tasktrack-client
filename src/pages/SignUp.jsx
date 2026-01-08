import { useState } from "react";
import { signUp } from "../api/signUpApi.js";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");

    // Password match check
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Call signUpApi
    const result = await signUp(email, password);

    if (result.success) {
      alert("Account created successfully!");
      console.log("User UID:", result.uid);

      {/* Restart all the input in form */ }
      setEmail("")
      setPassword("")
      setRePassword("")
      setEmailError("")

    } else {
      alert("Signup failed: " + result.error);
    }

  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
          <p className="text-gray-600 mt-1">Sign up to get started with TaskTrack</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Re-type Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Re-type Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Confirm your password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>

        {/* Switch to Sign In */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-gray-800 font-semibold hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
