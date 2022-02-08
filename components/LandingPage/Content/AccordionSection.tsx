import React, { FC } from "react";
import AccordionContent from "./AccordionContent";
import Link from "next/link";
import LandingPageRedButton from "../../Buttons/LandingPage/LandingPageRedButton";
import styles from "../../../styles/LandingPage/Content/AccordionSection.module.scss";

const AccordionSection: FC = () => {
  return (
    <>
      <div className={styles["accordion-section-title"]}>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className={styles["accordion-section-content-wrapper"]}>
        <div className={styles["accordion-section-content"]}>
          <AccordionContent />
        </div>
      </div>
      <div className={styles["accordion-section-after-content"]}>
        <p className={styles["accordion-section-after-content-title"]}>
          Ready to watch? Click Get Started to start watching.
        </p>
        <div className={styles["accordion-section-button-wrapper"]}>
          <Link href="/signin" passHref>
            <span>
              <LandingPageRedButton>Get Started</LandingPageRedButton>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AccordionSection;
