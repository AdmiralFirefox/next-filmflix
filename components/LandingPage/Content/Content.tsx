import React, { FC, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
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

  const centerContent = {
    width: "100%",
    margin: "0 auto",
    maxWidth: "120em",
  };

  return (
    <div className={styles["landing-page-content-wrapper"]}>
      <LandingPageNavbar />
      <HeroSection />
      <Box sx={centerContent}>
        <PageContentOne />
      </Box>
      <Divider className={styles["content-divider"]} />
      <Box sx={centerContent}>
        <PageContentTwo />
      </Box>
      <Divider className={styles["content-divider"]} />
      <Box sx={centerContent}>
        <PageContentThree />
      </Box>
      <Divider className={styles["content-divider"]} />
      <AccordionSection />
      <Divider className={styles["content-divider"]} />
      <LandingPageFooter />
    </div>
  );
};

export default Content;
