import React, { FC } from "react";
import Image from "next/image";
import Monitor from "../../../assets/landingpage/Monitor.png";
import Divider from "@mui/material/Divider";
import styles from "../../../styles/LandingPage/Content/PageContentOne.module.scss";

const PageContentOne: FC = () => {
  return (
    <>
      <div className={styles["page-content-one-wrapper"]}>
        <div className={styles["page-content-one-titles"]}>
          <h1 className={styles["page-content-one-info"]}>Enjoy on your TV.</h1>
          <p className={styles["page-content-one-description"]}>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        <div className={styles["page-content-one-image"]}>
          <Image
            src={Monitor}
            alt=""
            width={540}
            height={330}
            objectFit="cover"
          />
        </div>
      </div>

      <Divider
        className={styles["content-divider"]}
        sx={{ margin: "4em 0em" }}
      />
    </>
  );
};

export default PageContentOne;
