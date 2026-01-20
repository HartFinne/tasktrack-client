import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { login } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import RedirectByRole from "../../components/RedirectByRole.jsx";

import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../components/Loading.jsx";

const Login = () => {
  const { user, loading: authLoading } = useAuth();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toastType, setToastType] = useState(null); // "success" | "error"
  const [toastMessage, setToastMessage] = useState("");

  const [loading, setLoading] = useState(false)

  // React Query mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: () => {
      setToastType("success");
      setToastMessage("Logged in successfully!");

    },
    onError: (err) => {
      setToastType("error");
      setToastMessage(err.message || "Something went wrong");
    }
  });

  if (authLoading) {
    return <Loading fullScreen message={"Loading..."} />;
  }

  // Auto-redirect when user is already logged in
  if (user && user.role) {
    return <RedirectByRole />;
  }

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Invalid email");

    if (!password) return setPasswordError("Password is required");

    // Trigger react-query mutation
    loginMutation.mutate({ email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
        bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10
        dark:from-primary/20 dark:via-base-300 dark:to-secondary/20
        relative overflow-hidden"
    >
      {/* Soft glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-105 h-[420px] rounded-full
          bg-gradient-to-br from-primary/20 to-secondary/20
          blur-3xl opacity-60">
        </div>
      </div>

      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => setToastMessage("")}
      />

      {/* Card */}
      <div
        className="
          relative z-10 w-full max-w-md
          bg-base-100/75 dark:bg-base-100/75
          backdrop-blur-xl
          rounded-2xl
          border border-base-300/60 dark:border-base-200/40
          shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]
        "
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold
              bg-gradient-to-r from-primary to-secondary
              bg-clip-text text-transparent">
              TaskTrack
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <FormInput
              label="Email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              disabled={loginMutation.isPending}
            />

            <FormInput
              label="Password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              disabled={loginMutation.isPending}
            />

            <FormButton
              label="Sign In"
              isLoading={loginMutation.isPending}
              className="btn btn-primary w-full"
            />
          </form>

          {/* Footer */}
          <div className="divider my-6">OR</div>

          <p className="text-center text-sm">
            Don’t have an account?
            <Link
              to="/signup"
              className={`ml-1 link link-primary ${loginMutation.isPending
                ? "pointer-events-none opacity-50"
                : ""
                }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;