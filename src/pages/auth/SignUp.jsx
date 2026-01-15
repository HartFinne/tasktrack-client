import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { redirectByRole } from "../../utils/redirect.jsx";
import { signUp } from "../../api/signUpApi.js";
import { useAuth } from "../../context/AuthContext.jsx";

import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../components/Loading.jsx";


const SignUp = () => {
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [rePasswordError, setRePasswordError] = useState("")

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const navigate = useNavigate();

  // Redirect based on role
  if (authLoading) return <Loading fullScreen message="Loading..." />;
  const roleRedirect = redirectByRole(user);
  if (roleRedirect) return roleRedirect;


  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("")
    setRePasswordError("")

    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Please enter a valid email address");

    if (!password) return setPasswordError("Password is required")
    if (!rePassword) return setRePasswordError("Re-Password is required")

    if (password !== rePassword) {
      // alert("Passwords do not match");
      setPasswordError("Password do not match")
      setRePasswordError("Password do not match")
      return;
    }

    // ✅ Start loading BEFORE the async request
    setIsLoading(true);

    try {
      const result = await signUp(email, password);

      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      setSuccess("Registered Successfully");

      // Reset form
      setEmail("");
      setPassword("");
      setRePassword("");

      navigate("/", { replace: true });

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      // ✅ Stop loading after request finishes
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toast
        type={error ? "error" : "success"}
        message={error || success}
        duration={3000}
        onClose={() => { setError(""); setSuccess(""); }}
      />

      <Card
        title="Create an Account"
        subtitle="Sign up to get started with TaskTrack"
      >
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email */}
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
          />

          {/* Password */}
          <FormInput
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError("")
            }}
            error={passwordError}
          />


          {/* Re-type Password */}
          <FormInput
            label="Re-type Password"
            type="password"
            value={rePassword}
            placeholder="Confirm your password"
            onChange={(e) => setRePassword(e.target.value)}
            error={rePasswordError}
          />

          {/* Register Button */}
          <FormButton label="Register" isLoading={isLoading} />
        </form>

        {/* Switch to Sign In */}
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
