import React, { FC, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LandingPage = dynamic(
  () => import("../components/LandingPage/LandingPage")
);

const Home: FC = () => {
  const user = useContext(AuthContext);
  const router = useRouter();

  // Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
