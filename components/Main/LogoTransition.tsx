import React, { FC } from "react";
const NetflixSound = require("../../assets/sounds/NetflixSound.mp3");

const LogoTransition: FC = () => {
  return (
    <div className="animation-background">
      <div className="txt">FilmFlix</div>
      <audio autoPlay style={{ position: "absolute", display: "none" }}>
        <source src={NetflixSound} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default LogoTransition;
