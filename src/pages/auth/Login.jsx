import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { login } from "../../api/loginApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

import { redirectByRole } from "../../utils/redirect.jsx";

import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";

const Login = () => {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [error, setError] = useState("");

  const navigate = useNavigate

  if (loading) return <p>Loading...</p>;

  // Redirect based on role
  const roleRedirect = redirectByRole(user);
  if (roleRedirect) return roleRedirect;

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Please enter a valid email address");
    if (!password) return setPasswordError("Password is required");

    setEmailError("")
    setPasswordError("")

    const result = await login(email, password);

    if (!result.success) {
      setError("Auth credential invalid " + result.error);
      return;
    }

    alert("Account login successfully!");
    setEmail("");
    setPassword("");

    if (result.role === "employee") navigate("/dashboard", { replace: true });
    if (result.role === "admin") navigate("/admin-dashboard", { replace: true });
  };

  return (
    <Card
      title="TaskTrack"
      subtitle="Sign in to your account"
    >
      {/* Form */}
      <form className="space-y-4" onSubmit={handleLogin}>

        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={emailError}
        />

        {/* Password */}
        <FormInput
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Button */}
        <FormButton label="Sign In" />
      </form>

      {/* Register Link */}
      <p className="text-center text-sm mt-6">
        Don’t have an account?
        <Link to="/signup" className="text-primary hover:underline ml-1">
          Sign up
        </Link>
      </p>
    </Card>
  );
};

export default Login;
