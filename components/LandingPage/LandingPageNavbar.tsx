import React, { FC } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import WebLogo from "../../assets/logo/WebLogo.png";
import LandingPageRedButton from "../Buttons/LandingPage/LandingPageRedButton";
import styles from "../../styles/LandingPage/LandingPageNavbar.module.scss";

const LandingPageNavbar: FC = () => {
  return (
    <div className={styles["landing-page-navbar-wrapper"]}>
      <div className={styles["landing-page-navbar-image"]}>
        <Image
          src={WebLogo}
          alt="Web Logo"
          width={150}
          height={50}
          objectFit="cover"
        />
      </div>

      <div>
        <Link href="/signin" passHref legacyBehavior>
          <span>
            <LandingPageRedButton>Sign In</LandingPageRedButton>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
