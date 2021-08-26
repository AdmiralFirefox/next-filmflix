import React, { FC } from "react";
import Link from "next/link";
import herosSectionStyles from "../../../styles/Home.module.scss";
import LandingPageRedButton from "../../Buttons/LandingPage/LandingPageRedButton";

const HeroSection: FC = () => {
  return (
    <>
      <div className={herosSectionStyles["hero-section-bg"]}></div>
      <div className={herosSectionStyles["hero-section-gradient-shadow"]}></div>
      <div className={herosSectionStyles["hero-section-wrapper"]}>
        <div className={herosSectionStyles["hero-section-titles"]}>
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Click Get Started to Start Watching your favorite
            Movies and TV Shows.
          </p>
        </div>
        <div className={herosSectionStyles["hero-section-button-wrapper"]}>
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

export default HeroSection;
