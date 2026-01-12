import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../api/signUpApi.js";

import FormInput from "../../components/auth/FormInput.jsx";
import Card from "../../components/auth/Card.jsx";
import FormButton from "../../components/auth/FormButton.jsx";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")
  const [rePasswordError, setRePasswordError] = useState("")

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return setEmailError("Email is required");
    if (!validateEmail(email)) return setEmailError("Please enter a valid email address");

    setEmailError("");

    if (!password) return setPasswordError("Password is required")
    if (!rePassword) return setRePasswordError("Re-Password is required")

    setPasswordError("")
    setRePasswordError("")

    if (password !== rePassword) {
      // alert("Passwords do not match");
      // setPasswordError("Password do not match")
      // setRePasswordError("Password do not match")
      return;
    }

    const result = await signUp(email, password);

    if (result.success) {
      alert("Account created successfully!");

      // Reset form
      setEmail("");
      setPassword("");
      setRePassword("");
      setEmailError("");

    } else {
      alert("Signup failed: " + result.error);
    }
  };

  return (
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
          onChange={(e) => setPassword(e.target.value)}
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
        <FormButton label="Register" />
      </form>

      {/* Switch to Sign In */}
      <p className="text-center text-sm mt-4">
        Already have an account?
        <Link to="/" className="text-primary hover:underline ml-1">
          Sign in here
        </Link>
      </p>
    </Card>
  );
};

export default SignUp;
