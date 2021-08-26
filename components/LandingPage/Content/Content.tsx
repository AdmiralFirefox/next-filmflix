import React, { FC, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import LandingPageNavbar from "../LandingPageNavbar";
import HeroSection from "./HeroSection";
import PageContentOne from "./PageContentOne";
import PageContentTwo from "./PageContentTwo";
import PageContentThree from "./PageContentThree";
import AccordionSection from "./AccordionSection";
import LandingPageFooter from "./LandingPageFooter";
import contentStyles from "../../../styles/Home.module.scss";

const Content: FC = () => {
  //Content Background
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      contentStyles["landing-page-bg"];
  }, []);

  return (
    <div className={contentStyles["landing-page-content-wrapper"]}>
      <LandingPageNavbar />
      <HeroSection />
      <PageContentOne />
      <Divider className={contentStyles["content-divider"]} />
      <PageContentTwo />
      <Divider className={contentStyles["content-divider"]} />
      <PageContentThree />
      <Divider className={contentStyles["content-divider"]} />
      <AccordionSection />
      <Divider className={contentStyles["content-divider"]} />
      <LandingPageFooter />
    </div>
  );
};

export default Content;
