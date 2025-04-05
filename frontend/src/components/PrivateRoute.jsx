// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Login from "./Login";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("token", token); // Refresh token if needed
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div className="text-center mt-10">Checking authentication...</div>;

  if (!user) return <Login />;

  return children;
};

export default PrivateRoute;
