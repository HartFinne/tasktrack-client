import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { login } from "../../api/loginApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

import { redirectByRole } from "../../utils/redirect.jsx";

import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../components/Loading.jsx";

const Login = () => {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  if (authLoading) return <Loading fullScreen message="Loading..." />;

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
      setError(result.error || "Login credentials invalid");
      return;
    }

    setError(""); // clear errors
    setIsLoading(result.success)

    setEmail("");
    setPassword("");

    if (result.role === "employee") {
      setIsLoading(false);
      navigate("/dashboard", { replace: true })
    };
    if (result.role === "admin") {
      setIsLoading(false);
      navigate("/admin-dashboard", { replace: true })
    };
  };

  if (isLoading) return <Loading fullScreen message="Logging you in..." />;


  return (
    <div>
      <Toast
        type={error ? "error" : "success"}
        message={error || success}
        duration={3000}
        onClose={() => { setError(""); setSuccess(""); }}
      />
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
              setEmail(e.target.value)
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
    </div>

  );
};

export default Login;
