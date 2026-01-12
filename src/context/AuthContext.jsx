import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUserProfile } from "../api/userProfileApi.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// 10-second expiration for testing
const LOGIN_EXPIRATION_SECONDS = 3600;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track auto logout timer
  useEffect(() => {
    let logoutTimeout;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      const now = new Date().getTime();
      const loginTime = localStorage.getItem("loginTime");

      // Check if session expired
      if (loginTime && now - loginTime > LOGIN_EXPIRATION_SECONDS * 1000) {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      // Session valid → update login timestamp
      localStorage.setItem("loginTime", now);

      const fullProfile = await fetchUserProfile(firebaseUser);
      setUser(fullProfile);
      setLoading(false);

      // Setup auto logout countdown
      const remaining = LOGIN_EXPIRATION_SECONDS * 1000 - (now - (loginTime || now));
      logoutTimeout = setTimeout(async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("loginTime");
      }, remaining);
    });

    return () => {
      unsubscribe();
      if (logoutTimeout) clearTimeout(logoutTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
