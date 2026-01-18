import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { signUp } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

import RedirectByRole from "../../components/RedirectByRole.jsx";
import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../components/Loading.jsx";

const SignUp = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");

  const [toastType, setToastType] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // React Query mutation
  const signUpMutation = useMutation({
    mutationFn: ({ email, password }) => signUp(email, password),

    onSuccess: () => {
      setToastType("success");
      setToastMessage("Registered Successfully!");

      // Clear form
      setEmail("");
      setPassword("");
      setRePassword("");

      // Redirect to login
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    },

    onError: (err) => {
      setToastType("error");
      setToastMessage(err.message || "Something went wrong");
    }
  });

  // Redirect if authenticated
  if (authLoading) return <Loading fullScreen message="Loading..." />;
  if (user && user.role) return <RedirectByRole />;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setRePasswordError("");

    // Validation
    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Invalid email");

    if (!password) return setPasswordError("Password is required");
    if (!rePassword) return setRePasswordError("Re-password is required");

    if (password !== rePassword) {
      setPasswordError("Passwords do not match");
      setRePasswordError("Passwords do not match");
      return;
    }

    // Trigger signup request
    signUpMutation.mutate({ email, password });
  };

  return (
    <div>
      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => {
          setToastMessage("");
          setToastType(null);
        }}
      />

      <Card title="Create an Account" subtitle="Sign up to get started with TaskTrack">
        <form className="space-y-4" onSubmit={handleSubmit}>

          <FormInput
            label="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            error={emailError}
            disabled={signUpMutation.isPending}
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            error={passwordError}
            disabled={signUpMutation.isPending}
          />

          <FormInput
            label="Re-type Password"
            type="password"
            value={rePassword}
            placeholder="Confirm your password"
            onChange={(e) => setRePassword(e.target.value)}
            error={rePasswordError}
            disabled={signUpMutation.isPending}
          />

          <FormButton label="Register" isLoading={signUpMutation.isPending} />
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link to="/" className="text-primary hover:underline ml-1">
            Sign in here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;
