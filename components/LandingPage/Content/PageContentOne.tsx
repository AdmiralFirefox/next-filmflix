import React, { FC } from "react";
import Image from "next/image";
import Monitor from "../../../assets/landingpage/Monitor.gif";
import pageContentOneStyles from "../../../styles/Home.module.scss";

const PageContentOne: FC = () => {
  return (
    <div className={pageContentOneStyles["page-content-one-wrapper"]}>
      <div className={pageContentOneStyles["page-content-one-titles"]}>
        <h1 className={pageContentOneStyles["page-content-one-info"]}>
          Enjoy on your TV.
        </h1>
        <p className={pageContentOneStyles["page-content-one-description"]}>
          Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
          players, and more.
        </p>
      </div>
      <div className={pageContentOneStyles["page-content-one-image"]}>
        <Image
          src={Monitor}
          alt=""
          width={540}
          height={330}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default PageContentOne;
