export const firebaseErrorMessages = {
  // Email issues
  "auth/email-already-exists": "This email is already registered. Please use a different email",
  "auth/email-already-in-use": "This email is already registered. Please use a different email",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-continue-uri": "A valid continue URL must be provided.",
  "auth/unauthorized-continue-uri": "This domain is not authorized. Please check the link you used.",

  // Password issues
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/invalid-password": "Invalid password. It must be at least 6 characters.",
  "password-no-uppercase": "Password must contain at least one uppercase letter.",
  "password-no-lowercase": "Password must contain at least one lowercase letter.",
  "password-no-number": "Password must contain at least one number.",
  "password-no-special": "Password must contain at least one special character.",

  // User issues
  "auth/user-disabled": "This account has been disabled. Contact support for help.",
  "auth/user-not-found": "No account found with this email.",
  "auth/uid-already-exists": "A user with this ID already exists.",
  "auth/missing-uid": "User ID is required.",



  // Sign-in method issues
  "auth/operation-not-allowed": "This sign-in method is not enabled. Please contact support.",

  // Token / credential issues
  "auth/id-token-expired": "Your session has expired. Please login again.",
  "auth/id-token-revoked": "Your session has been revoked. Please login again.",
  "auth/insufficient-permission": "You don’t have permission to perform this action.",
  "auth/internal-error": "An internal error occurred. Please try again later.",

  // Phone
  "auth/invalid-phone-number": "Please enter a valid phone number.",
  "auth/phone-number-already-exists": "This phone number is already in use.",

  // OAuth / provider issues
  "auth/invalid-provider-id": "Invalid login provider.",
  "auth/invalid-oauth-responsetype": "Invalid OAuth configuration.",

  // Login
  "auth/invalid-credential": "Invalid Email or Password",

  // Catch-all for unexpected errors
  "default": "Something went wrong. Please try again."
};
