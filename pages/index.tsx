import React, { FC, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
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
  const user = useContext(AuthContext);
  const router = useRouter();

  // Route Changing when the user is logged in
  useEffect(() => {
    if (user) {
      router.push("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
