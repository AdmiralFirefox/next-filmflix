import React, { FC } from "react";
import dynamic from "next/dynamic";
import LogoAnimation from "./LogoAnimation";
const Content = dynamic(() => import("./Content/Content"));

const LandingPage: FC = () => {
  return (
    <div>
      <LogoAnimation />
      <Content />
    </div>
  );
};

export default LandingPage;
