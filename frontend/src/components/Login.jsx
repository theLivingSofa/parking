// src/components/Login.jsx
import React, { useState } from 'react';
// Import the specific function for email/password sign-in
import { signInWithEmailAndPassword } from "firebase/auth";
// Ensure 'auth' is correctly imported from your firebase configuration file
import { auth } from "../firebase";

function Login() {
  // State variables for email, password, errors, and loading status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handles the form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous errors
    setLoading(true); // Indicate loading process started

    // Basic validation
    if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
    }

    try {
      // Attempt to sign in with Firebase using email and password
      await signInWithEmailAndPassword(auth, email, password);

      // --- Important ---
      // No need to manually set user in localStorage or reload here.
      // Your `onAuthStateChanged` listener (in PrivateRoute or App)
      // will automatically detect the successful login and update the
      // application state, causing React to re-render and show the
      // protected content.
      // setLoading(false); // Component will likely unmount on successful login

    } catch (err) {
      console.error("Firebase Login Error:", err.code, err.message);
      // Set user-friendly error messages based on Firebase error codes
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === 'auth/invalid-email') {
          setError("Please enter a valid email address.");
      } else if (err.code === 'auth/too-many-requests') {
          setError("Access temporarily disabled due to too many attempts. Please try again later.");
      } else {
        setError("An unexpected error occurred during login. Please try again.");
      }
      setLoading(false); // Re-enable form submission
    }
  };

  // Render the login form (using Tailwind CSS classes)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Updated title for email/password login */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Team Panel Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required // HTML5 validation
              disabled={loading} // Disable input during loading
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required // HTML5 validation
              disabled={loading} // Disable input during loading
            />
          </div>

          {/* Display error messages */}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              // Dynamically change button appearance and state based on loading status
              className={`w-full px-6 py-3 rounded-lg shadow-md font-bold text-white focus:outline-none focus:shadow-outline ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed' // Style for loading state
                  : 'bg-indigo-600 hover:bg-indigo-700' // Style for active state
              }`}
              disabled={loading} // Disable button during loading
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
           {/* Optional: Link to password reset or registration */}
           {/* <div className="text-center mt-4">
              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
           </div> */}
        </form>
      </div>
    </div>
  );
}

export default Login;