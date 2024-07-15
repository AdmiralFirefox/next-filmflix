import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { AuthContext } from "../context/AuthContext";
const ProfileSelection = dynamic(
  () => import("../components/Main/ProfileSelection")
);

const Watch = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <ProfileSelection />;
};

export default Watch;
