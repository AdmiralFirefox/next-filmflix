import React, { FC } from "react";
import Link from "next/link";
import styles from "../../styles/LandingPage/SignUpFooter.module.scss";

const SignUpFooter: FC = () => {
  return (
    <div className={styles["signup-footer-container"]}>
      <div className={styles["signup-footer-wrapper"]}>
        <div className={styles["signup-footer-contact-links"]}>
          <div className={styles["signup-footer-questions"]}>
            <Link href="/signin">
              Questions? Contact us.
            </Link>
          </div>
          <div className={styles["signup-footer-links-info"]}>
            <Link href="/signin">
              FAQ
            </Link>

            <Link href="/signin">
              Cookie Preferences
            </Link>

            <Link href="/signin">
              Help Center
            </Link>

            <Link href="/signin">
              Corporate Information
            </Link>
          </div>
        </div>
        <div className={styles["signup-footer-terms-of-service"]}>
          <Link href="/signin">
            Terms of Use
          </Link>
          <Link href="/signin">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpFooter;
