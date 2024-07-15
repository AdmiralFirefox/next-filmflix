import React, { FC } from "react";
import Image from "next/legacy/image";
import Kids from "../../../assets/landingpage/Kids.png";
import Divider from "@mui/material/Divider";
import styles from "../../../styles/LandingPage/Content/PageContentThree.module.scss";

const PageContentThree: FC = () => {
  return (
    <>
      <div className={styles["page-content-three-wrapper"]}>
        <div className={styles["page-content-three-title"]}>
          <h1 className={styles["page-content-three-info"]}>
            Create profiles for kids.
          </h1>
          <p className={styles["page-content-three-description"]}>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
        <div className={styles["page-content-three-image"]}>
          <Image src={Kids} alt="" width={540} height={400} objectFit="cover" />
        </div>
      </div>

      <Divider
        className={styles["content-divider"]}
        sx={{ margin: "4em 0em" }}
      />
    </>
  );
};

export default PageContentThree;
