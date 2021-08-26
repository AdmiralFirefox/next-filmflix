import Modal from "@material-ui/core/Modal";
import dynamic from "next/dynamic";
const MovieTrailer = dynamic(() => import("../../Movies/MovieTrailer"));
const MovieCasts = dynamic(() => import("../../Movies/MovieCasts"));
const SimilarMovies = dynamic(() => import("../../Movies/SimilarMovies"));
import React, { FC, useState, useEffect } from "react";
import movieInfoModalStyles from "../../../styles/Home.module.scss";

//Tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
}) => {
  //Tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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

  //Adjusting vh of a window since 100vh is broken on mobile
  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseMovieModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={movieInfoModalStyles["movie-info-modal-wrapper"]}>
          <div
            onClick={handleCloseMovieModal}
            className={movieInfoModalStyles["movie-info-modal-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
          <MovieTrailer id={id} />
          <div className={movieInfoModalStyles["movie-info-modal-content"]}>
            <div className={movieInfoModalStyles["movie-info-modal-title"]}>
              <h1>{title}</h1>
            </div>

            <div
              className={movieInfoModalStyles["movie-info-modal-release-info"]}
            >
              <div
                className={
                  movieInfoModalStyles["movie-info-modal-release-date"]
                }
              >
                {releaseDate !== "" ? (
                  <p>{new Date(releaseDate).toLocaleDateString()}</p>
                ) : (
                  <p>N/A</p>
                )}
              </div>

              <div className={movieInfoModalStyles["movie-info-modal-runtime"]}>
                {runtime !== 0 ? <p>{timeConvert(runtime)} </p> : <p>N/A</p>}
              </div>
            </div>

            <div className={movieInfoModalStyles["movie-info-modal-overview"]}>
              <h2>Overview:</h2>
              <div
                className={
                  movieInfoModalStyles["movie-info-modal-overview-content"]
                }
              >
                {overview !== "" ? (
                  <p>{overview}</p>
                ) : (
                  <p>Overview Unvailable...</p>
                )}
              </div>
            </div>

            <div className={movieInfoModalStyles["movie-info-modal-status"]}>
              <p>Status: {status}</p>
            </div>

            <div className={movieInfoModalStyles["movie-info-modal-genre"]}>
              <h2>Genre:</h2>
              {genres.map((genre) => {
                return (
                  <div
                    key={genre.id}
                    className={
                      movieInfoModalStyles["movie-info-modal-genre-name"]
                    }
                  >
                    <p> - {genre.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <AppBar
              position="static"
              style={{ backgroundColor: "#000000", boxShadow: "none" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                TabIndicatorProps={{
                  style: { borderBottom: "5px solid#E50914", color: "#fff" },
                }}
              >
                <Tab label="Casts" {...a11yProps(0)} />
                <Tab label="Similar Movies" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <MovieCasts id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SimilarMovies id={id} />
            </TabPanel>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MovieModal;
