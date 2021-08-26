import React, { FC } from "react";
import AccordionContent from "./AccordionContent";
import Link from "next/link";
import LandingPageRedButton from "../../Buttons/LandingPage/LandingPageRedButton";
import accordionSectionStyles from "../../../styles/Home.module.scss";

const AccordionSection: FC = () => {
  return (
    <div>
      <div className={accordionSectionStyles["accordion-section-title"]}>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className={accordionSectionStyles["accordion-section-content"]}>
        <AccordionContent />
      </div>
      <div
        className={accordionSectionStyles["accordion-section-after-content"]}
      >
        <p
          className={
            accordionSectionStyles["accordion-section-after-content-title"]
          }
        >
          Ready to watch? Click Get Started to start watching.
        </p>
        <div
          className={accordionSectionStyles["accordion-section-button-wrapper"]}
        >
          <Link href="/signin" passHref>
            <span>
              <LandingPageRedButton>Get Started</LandingPageRedButton>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
