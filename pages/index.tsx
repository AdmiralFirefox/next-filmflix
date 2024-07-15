import React, { FC, useEffect } from "react";
import dynamic from "next/dynamic";
const LandingPageNavbar = dynamic(
  () => import("../components/LandingPage/LandingPageNavbar")
);
const HeroSection = dynamic(
  () => import("../components/LandingPage/Content/HeroSection")
);
const PageContentOne = dynamic(
  () => import("../components/LandingPage/Content/PageContentOne")
);
const PageContentTwo = dynamic(
  () => import("../components/LandingPage/Content/PageContentTwo")
);
const PageContentThree = dynamic(
  () => import("../components/LandingPage/Content/PageContentThree")
);
const AccordionSection = dynamic(
  () => import("../components/LandingPage/Content/AccordionSection")
);
const LandingPageFooter = dynamic(
  () => import("../components/LandingPage/Content/LandingPageFooter")
);
import styles from "../styles/Pages/Home.module.scss";

const Home: FC = () => {
  //Content Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      styles["landing-page-bg"];
  }, []);

  return (
    <>
      <div className={styles["landing-page-content-wrapper"]}>
        <LandingPageNavbar />
        <HeroSection />
        <PageContentOne />
        <PageContentTwo />
        <PageContentThree />
        <AccordionSection />
        <LandingPageFooter />
      </div>
    </>
  );
};

export default Home;
