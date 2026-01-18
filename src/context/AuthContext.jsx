import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUserProfile } from "../api/userProfileApi.js";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const LOGIN_EXPIRATION_SECONDS = 10;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let logoutTimeout;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      const now = Date.now();
      const loginTime = localStorage.getItem("loginTime");

      if (loginTime && now - loginTime > LOGIN_EXPIRATION_SECONDS * 1000) {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("loginTime");
        setLoading(false);
        return;
      }

      localStorage.setItem("loginTime", now);

      const fullProfile = await fetchUserProfile(firebaseUser);
      const token = await firebaseUser.getIdToken();

      setUser({ ...fullProfile, token });
      setLoading(false);

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
