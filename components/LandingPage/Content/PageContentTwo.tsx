import React, { FC } from "react";
import ReactPlayer from "react-player";
import Divider from "@mui/material/Divider";
import styles from "../../../styles/LandingPage/Content/PageContentTwo.module.scss";

const PageContentTwo: FC = () => {
  return (
    <>
      <div className={styles["page-content-two-wrapper"]}>
        <div className={styles["page-content-two-title"]}>
          <h1 className={styles["page-content-two-info"]}>Watch everywhere.</h1>
          <p className={styles["page-content-two-description"]}>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
        <div className={styles["page-content-two-image"]}>
          <ReactPlayer
            loop
            muted
            playing
            url="videos/Watch.mp4"
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

export default PageContentTwo;
