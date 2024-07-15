import React, { FC } from "react";
import Link from "next/link";
import styles from "../../../styles/LandingPage/Content/LandingPageFooter.module.scss";

const LandingPageFooter: FC = () => {
  return (
    <div className={styles["landing-page-footer-wrapper"]}>
      <div className={styles["landing-page-footer-questions"]}>
        <Link href="/">
          Questions? Contact us.
        </Link>
      </div>
      <div className={styles["landing-page-footer-links"]}>
        <div>
          <Link href="/">
            FAQ
          </Link>
          <Link href="/">
            Investor Relations
          </Link>
          <Link href="/">
            Ways to Watch
          </Link>
          <Link href="/">
            Corporate Information
          </Link>
          <Link href="/">
            Only on Filmflix
          </Link>
        </div>
        <div>
          <Link href="/">
            Help Center
          </Link>
          <Link href="/">
            Jobs
          </Link>
          <Link href="/">
            Terms of Use
          </Link>
          <Link href="/">
            Contact Us
          </Link>
        </div>
        <div>
          <Link href="/">
            Account
          </Link>
          <Link href="/">
            Redeem Gift Cards
          </Link>
          <Link href="/">
            Privacy
          </Link>
          <Link href="/">
            Speed Test
          </Link>
        </div>
        <div>
          <Link href="/">
            Media Center
          </Link>
          <Link href="/">
            Buy Gift Cards
          </Link>
          <Link href="/">
            Cookie Preferences
          </Link>
          <Link href="/">
            Legal Notices
          </Link>
        </div>
      </div>
      <div className={styles["landing-page-footer-rights"]}>
        <p>Filmflix. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPageFooter;
