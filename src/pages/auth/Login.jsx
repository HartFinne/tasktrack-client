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
    <div>
      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => setToastMessage("")}
      />

      <Card title="TaskTrack" subtitle="Sign in to your account">
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

          <FormButton label="Sign In" isLoading={loginMutation.isPending} />
        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?
          <Link to="/signup" className="text-primary hover:underline ml-1" disabled={loginMutation.isPending}>
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
