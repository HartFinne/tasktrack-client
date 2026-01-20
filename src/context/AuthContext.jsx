import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUserProfile } from "../api/userProfileApi.js";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const LOGIN_EXPIRATION_SECONDS = 1000;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to log out manually
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("loginTime");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    let logoutTimeout;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      const now = Date.now();
      const loginTime = localStorage.getItem("loginTime");

      if (loginTime && now - loginTime > LOGIN_EXPIRATION_SECONDS * 1000) {
        await logout(); // session expired
        setLoading(false);
        return;
      }

      localStorage.setItem("loginTime", now);

      try {
        const fullProfile = await fetchUserProfile(firebaseUser);
        const token = await firebaseUser.getIdToken();
        setUser({ ...fullProfile, token });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      } finally {
        setLoading(false);
      }

      const remaining =
        LOGIN_EXPIRATION_SECONDS * 1000 - (now - (loginTime || now));

      logoutTimeout = setTimeout(() => {
        logout();
      }, remaining);
    });

    return () => {
      unsubscribe();
      logoutTimeout && clearTimeout(logoutTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
