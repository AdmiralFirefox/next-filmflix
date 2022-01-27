import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
const ProfileSelection = dynamic(
  () => import("../components/Main/ProfileSelection")
);

const Main = () => {
  const user = useContext(AuthContext);
  const router = useRouter();

  //Allow Users to Sign Out
  const signOut = async () => {
    await auth.signOut();
  };

  //Redirects the user to the previous route if the user is not signed in
  useEffect(() => {
    if (!user) {
      router.back();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{user && <ProfileSelection signOut={signOut} />}</>;
};

export default Main;
