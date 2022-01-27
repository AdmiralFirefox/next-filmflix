import React, { FC } from "react";
import Image from "next/image";
import Watch from "../../../assets/landingpage/Watch.gif";
import pageContentTwoStyles from "../../../styles/Home.module.scss";

const PageContentTwo: FC = () => {
  return (
    <div className={pageContentTwoStyles["page-content-two-wrapper"]}>
      <div className={pageContentTwoStyles["page-content-two-title"]}>
        <h1 className={pageContentTwoStyles["page-content-two-info"]}>
          Watch everywhere.
        </h1>
        <p className={pageContentTwoStyles["page-content-two-description"]}>
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </p>
      </div>
      <div className={pageContentTwoStyles["page-content-two-image"]}>
        <Image
          src={Watch}
          alt=""
          width={460}
          height={350}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default PageContentTwo;
