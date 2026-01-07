const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">TaskTrack</h1>
          <p className="text-gray-600 mt-2 text-lg">Sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Email Input */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-base text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;

