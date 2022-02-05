import React, { FC, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import LandingPageNavbar from "../LandingPageNavbar";
import HeroSection from "./HeroSection";
import PageContentOne from "./PageContentOne";
import PageContentTwo from "./PageContentTwo";
import PageContentThree from "./PageContentThree";
import AccordionSection from "./AccordionSection";
import LandingPageFooter from "./LandingPageFooter";
import styles from "../../../styles/LandingPage/Content/Content.module.scss";

const Content: FC = () => {
  //Content Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      styles["landing-page-bg"];
  }, []);

  return (
    <div className={styles["landing-page-content-wrapper"]}>
      <LandingPageNavbar />
      <HeroSection />
      <PageContentOne />
      <Divider className={styles["content-divider"]} />
      <PageContentTwo />
      <Divider className={styles["content-divider"]} />
      <PageContentThree />
      <Divider className={styles["content-divider"]} />
      <AccordionSection />
      <Divider className={styles["content-divider"]} />
      <LandingPageFooter />
    </div>
  );
};

export default Content;
