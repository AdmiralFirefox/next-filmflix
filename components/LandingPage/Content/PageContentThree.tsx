import React, { FC } from "react";
import Image from "next/image";
import Kids from "../../../assets/landingpage/Kids.png";
import pageContentThreeStyles from "../../../styles/Home.module.scss";

const PageContentThree: FC = () => {
  return (
    <div className={pageContentThreeStyles["page-content-three-wrapper"]}>
      <div className={pageContentThreeStyles["page-content-three-title"]}>
        <h1 className={pageContentThreeStyles["page-content-three-info"]}>
          Create profiles for kids.
        </h1>
        <p className={pageContentThreeStyles["page-content-three-description"]}>
          Send kids on adventures with their favorite characters in a space made
          just for them—free with your membership.
        </p>
      </div>
      <div className={pageContentThreeStyles["page-content-three-image"]}>
        <Image
          src={Kids}
          alt=""
          width={540}
          height={400}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default PageContentThree;
