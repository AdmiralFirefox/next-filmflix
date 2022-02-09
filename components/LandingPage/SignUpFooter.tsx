import React, { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import styles from "../../styles/LandingPage/SignUpFooter.module.scss";

const SignUpFooter: FC = () => {
  return (
    <Box
      sx={{ background: "rgba(0, 0, 0, 0.8)", width: "100%", marginTop: "5em" }}
    >
      <div className={styles["signup-footer-wrapper"]}>
        <div className={styles["signup-footer-contact-links"]}>
          <div className={styles["signup-footer-questions"]}>
            <Link href="/signin">
              <a>Questions? Contact us.</a>
            </Link>
          </div>
          <div className={styles["signup-footer-links-info"]}>
            <Link href="/signin">
              <a>FAQ</a>
            </Link>

            <Link href="/signin">
              <a>Cookie Preferences</a>
            </Link>

            <Link href="/signin">
              <a>Help Center</a>
            </Link>

            <Link href="/signin">
              <a>Corporate Information</a>
            </Link>
          </div>
        </div>
        <div className={styles["signup-footer-terms-of-service"]}>
          <Link href="/signin">
            <a>Terms of Use</a>
          </Link>
          <Link href="/signin">
            <a>Privacy</a>
          </Link>
        </div>
      </div>
    </Box>
  );
};

export default SignUpFooter;
