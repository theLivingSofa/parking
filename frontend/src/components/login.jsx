// // src/components/Login.jsx
// import React from "react";
// import { auth, provider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";

// function Login() {
//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const token = await user.getIdToken(); // Get the secure token

//       // Store user info and token for later use
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);

//       // You can trigger a reload or render the protected route
//       window.location.reload();
//     } catch (error) {
//       console.error("Login Error:", error);
//       alert("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4">Team Login</h2>
//         <p className="mb-6 text-gray-600">Only authorized team members can access this panel.</p>
//         <button
//           onClick={handleLogin}
//           className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
//         >
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user email is allowed
      const allowedEmails = ["ayushagrawal10242@gmail.com", "ayushagrawal733@gmail.com"];
      if (!allowedEmails.includes(user.email)) {
        alert("You are not authorized to access this panel.");
        return;
      }

      const token = await user.getIdToken(true); // Get the secure, refreshed token

      // Store user info and token for later use
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Redirect to the protected route
      navigate("/dashboard"); // Redirect to a protected page
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Team Login</h2>
        <p className="mb-6 text-gray-600">Only authorized team members can access this panel.</p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
