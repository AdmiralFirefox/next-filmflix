import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import WebLogo from "../../assets/logo/WebLogo.png";
import landingPageNavbarStyles from "../../styles/Home.module.scss";
import LandingPageRedButton from "../Buttons/LandingPage/LandingPageRedButton";

const LandingPageNavbar: FC = () => {
  return (
    <div className={landingPageNavbarStyles["landing-page-navbar-wrapper"]}>
      <div className={landingPageNavbarStyles["landing-page-navbar-image"]}>
        <Image
          src={WebLogo}
          alt="Web Logo"
          width={150}
          height={50}
          objectFit="cover"
        />
      </div>

      <div>
        <Link href="/signin" passHref>
          <span>
            <LandingPageRedButton>Sign In</LandingPageRedButton>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
