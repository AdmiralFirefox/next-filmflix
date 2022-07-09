import React, { FC } from "react";
import ReactPlayer from "react-player";
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
          <ReactPlayer
            loop
            muted
            playing
            url="videos/Monitor.mp4"
            width="100%"
            height="100%"
            controls={false}
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
