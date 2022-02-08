import Modal from "@mui/material/Modal";
import dynamic from "next/dynamic";
import { useWindowSize, Size } from "../../../hooks/useWindowSize";
const MovieTrailer = dynamic(() => import("../../Movies/MovieTrailer"));
const MovieCasts = dynamic(() => import("../../Movies/MovieCasts"));
const SimilarMovies = dynamic(() => import("../../Movies/SimilarMovies"));
import React, { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../../../styles/Modal/Movies/MovieModal.module.scss";

//Tabs
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

interface ModalFunctionProp {
  open: boolean;
  handleCloseMovieModal: () => void;
  overview: string;
  releaseDate: number | string;
  genres: {
    id: number;
    name: string;
  }[];
  runtime: number;
  status: string;
  title: string;
  id: number;
  spokenLanguages: {
    english_name: string;
  }[];
}

const MovieModal: FC<ModalFunctionProp> = ({
  open,
  handleCloseMovieModal,
  overview,
  releaseDate,
  genres,
  runtime,
  status,
  title,
  id,
  spokenLanguages,
}) => {
  //Tabs
  const [value, setValue] = useState("1");

  const size: Size = useWindowSize();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //Converting Minutes to Hours and Minutes
  const timeConvert = (n: number) => {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseMovieModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={styles["movie-info-modal-wrapper"]}
          style={{ height: `${size.height}px` }}
        >
          <div
            onClick={handleCloseMovieModal}
            className={styles["movie-info-modal-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
          <MovieTrailer id={id} />
          <div className={styles["movie-info-modal-content"]}>
            <div className={styles["movie-info-modal-title"]}>
              <h1>{title}</h1>
            </div>

            <div className={styles["movie-info-modal-release-info"]}>
              <div className={styles["movie-info-modal-release-date"]}>
                {releaseDate !== "" ? (
                  <p>{new Date(releaseDate).toLocaleDateString()}</p>
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className={styles["movie-info-modal-runtime"]}>
                {runtime !== 0 ? <p>{timeConvert(runtime)} </p> : <p>N/A</p>}
              </div>
            </div>

            <div className={styles["movie-info-modal-overview"]}>
              <h2>Overview:</h2>
              <div className={styles["movie-info-modal-overview-content"]}>
                {overview !== "" ? (
                  <p>{overview}</p>
                ) : (
                  <p>Overview Unvailable...</p>
                )}
              </div>
            </div>

            <div className={styles["movie-info-modal-status"]}>
              <p>Status: {status}</p>
            </div>

            <div className={styles["movie-info-spoken-languages"]}>
              {spokenLanguages.length === 1 ? (
                <h2>Spoken Language:</h2>
              ) : (
                <h2>Spoken Languages:</h2>
              )}

              <div className={styles["movie-info-spoken-languages-content"]}>
                {spokenLanguages.map((language, index) => {
                  return (
                    <div
                      key={uuidv4()}
                      className={styles["movie-info-modal-language-name"]}
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

            <div className={styles["movie-info-modal-genre"]}>
              {genres.length === 1 ? <h2>Genre:</h2> : <h2>Genres:</h2>}
              <div className={styles["movie-info-modal-genre-content"]}>
                {genres.map((genre, index) => {
                  return (
                    <div
                      key={genre.id}
                      className={styles["movie-info-modal-genre-name"]}
                    >
                      <p>
                        {genre.name +
                          (index < genres.length - 2
                            ? ","
                            : index === genres.length - 2
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
                <Box>
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
                      label="Casts"
                      value="1"
                      sx={{
                        color: "#fff",
                        "&.Mui-selected": { color: "#fff" },
                      }}
                    />
                    <Tab
                      label="Similar Movies"
                      value="2"
                      sx={{
                        color: "#fff",
                        "&.Mui-selected": { color: "#fff" },
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <MovieCasts id={id} />
                </TabPanel>
                <TabPanel value="2">
                  <SimilarMovies id={id} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MovieModal;
