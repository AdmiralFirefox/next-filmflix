import React, { FC } from "react";
import dynamic from "next/dynamic";
const LandingPage = dynamic(
  () => import("../components/LandingPage/LandingPage")
);

const Home: FC = () => {
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Home;
