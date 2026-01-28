import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signUp } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

import RedirectByRole from "../../components/RedirectByRole.jsx";
import FormInput from "../../components/auth/FormInput.jsx";
import FormButton from "../../components/auth/FormButton.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../components/Loading.jsx";

import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessages.js";

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

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["users"] });

    },

    onError: (err) => {
      setToastType("error");
      setToastMessage(getFirebaseErrorMessage(err));
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
    <div
      className="min-h-screen flex items-center justify-center px-4
        bg-linear-to-br from-primary/10 via-base-200 to-secondary/10
        dark:from-primary/20 dark:via-base-300 dark:to-secondary/20
        relative overflow-hidden"
    >
      {/* Soft glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-105 h-105 rounded-full
          bg-linear-to-br from-primary/20 to-secondary/20
          blur-3xl opacity-60">
        </div>
      </div>

      <Toast
        type={toastType}
        message={toastMessage}
        duration={3000}
        onClose={() => {
          setToastMessage("");
          setToastType(null);
        }}
      />

      {/* Card */}
      <div
        className="
          relative z-10 w-full max-w-md
          bg-base-100/75 backdrop-blur-xl
          rounded-2xl
          border border-base-300/60
          shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]
        "
      >
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold text-center bg-linear-to-r from-primary to-secondary
              bg-clip-text text-transparent">Create an Account</h2>
          <p className="text-sm text-center text-base-content/70 mb-4">
            Sign up to get started with TaskTrack
          </p>

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
              onChange={(e) => {
                setRePassword(e.target.value);
                setRePasswordError("");
              }}
              error={rePasswordError}
              disabled={signUpMutation.isPending}
            />

            <FormButton
              label="Create Account"
              isLoading={signUpMutation.isPending}
            />
          </form>

          {/* Footer */}
          <div className="divider">OR</div>

          <p className="text-center text-sm ">
            Already have an account?
            <Link to="/" className="text-primary hover:underline ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;