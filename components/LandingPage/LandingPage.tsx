import React, { FC } from "react";
import dynamic from "next/dynamic";
import { useSpring, animated } from "react-spring";
const Content = dynamic(() => import("./Content/Content"));
const LogoAnimation = dynamic(() => import("./LogoAnimation"));

const LandingPage: FC = () => {
  const fadeInProps = useSpring({
    from: { opacity: 0, display: "none" },
    to: { opacity: 1, display: "inline" },
    delay: 5000,
    config: { duration: 1000 },
  });

  const fadeOutProps = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 5000,
    config: { duration: 1000 },
  });

  return (
    <div>
      <animated.div style={fadeOutProps}>
        <LogoAnimation />
      </animated.div>
      <animated.div style={fadeInProps}>
        <Content />
      </animated.div>
    </div>
  );
};

export default LandingPage;
