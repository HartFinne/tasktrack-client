import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUserProfile } from "../api/userProfileApi.js";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const LOGIN_EXPIRATION_SECONDS = 60;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let logoutTimeout;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Start loading whenever auth state changes
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false); // no user, done loading
        return;
      }

      const now = Date.now();
      const loginTime = localStorage.getItem("loginTime");

      if (loginTime && now - loginTime > LOGIN_EXPIRATION_SECONDS * 1000) {
        // session expired
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      localStorage.setItem("loginTime", now);

      try {
        // Fetch full profile & token
        const fullProfile = await fetchUserProfile(firebaseUser);
        const token = await firebaseUser.getIdToken();

        setUser({ ...fullProfile, token });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        setUser(null);
      } finally {
        setLoading(false); // done fetching user
      }

      const remaining =
        LOGIN_EXPIRATION_SECONDS * 1000 - (now - (loginTime || now));

      logoutTimeout = setTimeout(async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("loginTime");
      }, remaining);
    });

    return () => {
      unsubscribe();
      logoutTimeout && clearTimeout(logoutTimeout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
