import React, { FC } from "react";
import Image from "next/image";
import WebLogo from "../../assets/logo/WebLogo.png";

const Loading: FC = () => {
  return (
    <div id="main-loading-wrapper">
      <div id="main-loading">
        <div className="main-loading-web-logo">
          <Image src={WebLogo} alt="Web Logo" priority={true} />
        </div>
        <div className="main-loading-bulletouter">
          <div className="main-loading-bulletinner" />
          <div className="main-mask" />
          <div className="main-dot" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
