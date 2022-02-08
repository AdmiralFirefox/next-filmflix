import React, { FC, useState } from "react";
import { useWindowSize, Size } from "../../../hooks/useWindowSize";
import dynamic from "next/dynamic";
import Modal from "@mui/material/Modal";
const TVTrailer = dynamic(() => import("../../TVs/TVTrailer"));
const SimilarTV = dynamic(() => import("../../TVs/SimilarTV"));
const TVSeasons = dynamic(() => import("../../TVs/TVSeasons"));
const TVCasts = dynamic(() => import("../../TVs/TVCasts"));
import { v4 as uuidv4 } from "uuid";
import styles from "../../../styles/Modal/TVs/TVModal.module.scss";

//Tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface TVModalProp {
  openTVModal: boolean;
  handleCloseTVInfo: () => void;
  overview: string;
  genresTV: {
    id: number;
    name: string;
  }[];
  dateAired: number;
  episodes: number;
  seasons: number;
  status: string;
  lastDateAired: number;
  name: string;
  id: number;
  spokenLanguages: {
    english_name: string;
  }[];
}

const TVModal: FC<TVModalProp> = ({
  openTVModal,
  handleCloseTVInfo,
  overview,
  genresTV,
  dateAired,
  episodes,
  seasons,
  status,
  lastDateAired,
  name,
  id,
  spokenLanguages,
}) => {
  //Tabs
  const [value, setValue] = useState("1");

  const size: Size = useWindowSize();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Modal
        open={openTVModal}
        onClose={handleCloseTVInfo}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={styles["tv-modal-wrapper"]}
          style={{ height: `${size.height}px` }}
        >
          <div
            onClick={handleCloseTVInfo}
            className={styles["tv-modal-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
          <TVTrailer id={id} />

          <div className={styles["tv-modal-content"]}>
            <div className={styles["tv-modal-title"]}>
              <h1>{name}</h1>
            </div>

            <div className={styles["tv-modal-series-info"]}>
              <div className={styles["tv-modal-episodes"]}>
                {episodes <= 1 ? (
                  <p>{episodes} Episode</p>
                ) : (
                  <p>{episodes} Episodes</p>
                )}
              </div>

              <div className={styles["tv-modal-seasons"]}>
                {seasons <= 1 ? (
                  <p>{seasons} Season</p>
                ) : (
                  <p>{seasons} Seasons</p>
                )}
              </div>
            </div>

            <div className={styles["tv-modal-overview"]}>
              <h2>Overview:</h2>
              <div className={styles["tv-modal-overview-content"]}>
                {overview !== "" ? (
                  <p>{overview}</p>
                ) : (
                  <p>Overview Unvailable...</p>
                )}
              </div>
            </div>

            <div className={styles["tv-modal-date-aired"]}>
              {dateAired === null ? (
                <p>Date First Aired: N/A</p>
              ) : (
                <p>
                  Date First Aired: {new Date(dateAired).toLocaleDateString()}
                </p>
              )}

              {lastDateAired === null ? (
                <p>Date Last Aired: N/A</p>
              ) : (
                <p>
                  Date Last Aired:{" "}
                  {new Date(lastDateAired).toLocaleDateString()}
                </p>
              )}
            </div>

            <div className={styles["tv-modal-status"]}>
              <p>Status: {status}</p>
            </div>

            <div className={styles["tv-info-spoken-languages"]}>
              {spokenLanguages.length === 1 ? (
                <h2>Spoken Language:</h2>
              ) : (
                <h2>Spoken Languages:</h2>
              )}
              <div className={styles["tv-info-spoken-languages-content"]}>
                {spokenLanguages.map((language, index) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={styles["tv-info-modal-language-name"]}
                    >
                      <p>
                        {language.english_name +
                          (index < spokenLanguages.length - 2
                            ? ","
                            : index === spokenLanguages.length - 2
                            ? " and"
                            : "")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles["tv-modal-genres"]}>
              {genresTV.length === 1 ? <h2>Genre:</h2> : <h2>Genres:</h2>}
              <div className={styles["tv-info-modal-genre-content"]}>
                {genresTV.map((genreTV, index) => {
                  return (
                    <div
                      key={genreTV.id}
                      className={styles["tv-modal-genre-name"]}
                    >
                      <p>
                        {genreTV.name +
                          (index < genresTV.length - 2
                            ? ","
                            : index === genresTV.length - 2
                            ? " and"
                            : "")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{ background: "#000" }}
                    TabIndicatorProps={{
                      style: {
                        borderBottom: "5px solid#E50914",
                      },
                    }}
                    variant="scrollable"
                  >
                    <Tab
                      label="Episodes"
                      value="1"
                      sx={{
                        color: "#fff",
                        "&.Mui-selected": { color: "#fff" },
                      }}
                    />
                    <Tab
                      label="Casts"
                      value="2"
                      sx={{
                        color: "#fff",
                        "&.Mui-selected": { color: "#fff" },
                      }}
                    />
                    <Tab
                      label="Similar TV"
                      value="3"
                      sx={{
                        color: "#fff",
                        "&.Mui-selected": { color: "#fff" },
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <TVSeasons seasons={seasons} id={id} />
                </TabPanel>
                <TabPanel value="2">
                  <TVCasts id={id} />
                </TabPanel>
                <TabPanel value="3">
                  <SimilarTV id={id} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TVModal;
