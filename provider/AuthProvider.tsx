import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import { auth } from "../firebase/firebase";
import Loading from "../components/Loading/Loading";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
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
  }, []);

  if (initializing)
    return (
      <div>
        <Loading />
      </div>
    );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
