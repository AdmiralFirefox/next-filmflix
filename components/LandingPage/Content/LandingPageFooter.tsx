import React, { FC } from "react";
import Link from "next/link";
import styles from "../../../styles/LandingPage/Content/LandingPageFooter.module.scss";

const LandingPageFooter: FC = () => {
  return (
    <div className={styles["landing-page-footer-wrapper"]}>
      <div className={styles["landing-page-footer-questions"]}>
        <Link href="/">
          <a>Questions? Contact us.</a>
        </Link>
      </div>
      <div className={styles["landing-page-footer-links"]}>
        <div>
          <Link href="/">
            <a>FAQ</a>
          </Link>
          <Link href="/">
            <a>Investor Relations</a>
          </Link>
          <Link href="/">
            <a>Ways to Watch</a>
          </Link>
          <Link href="/">
            <a>Corporate Information</a>
          </Link>
          <Link href="/">
            <a>Only on Filmflix</a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a>Help Center</a>
          </Link>
          <Link href="/">
            <a>Jobs</a>
          </Link>
          <Link href="/">
            <a>Terms of Use</a>
          </Link>
          <Link href="/">
            <a>Contact Us</a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a>Account</a>
          </Link>
          <Link href="/">
            <a>Redeem Gift Cards</a>
          </Link>
          <Link href="/">
            <a>Privacy</a>
          </Link>
          <Link href="/">
            <a>Speed Test</a>
          </Link>
        </div>
        <div>
          <Link href="/">
            <a>Media Center</a>
          </Link>
          <Link href="/">
            <a>Buy Gift Cards</a>
          </Link>
          <Link href="/">
            <a>Cookie Preferences</a>
          </Link>
          <Link href="/">
            <a>Legal Notices</a>
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
