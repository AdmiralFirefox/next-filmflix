import { FC, useState, useEffect } from "react";
import { AuthContext, UserInfo } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading/Loading";

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!user) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
