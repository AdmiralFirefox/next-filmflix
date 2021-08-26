import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@material-ui/core/Modal";
const TVTrailer = dynamic(() => import("../../TVs/TVTrailer"));
const SimilarTV = dynamic(() => import("../../TVs/SimilarTV"));
const TVSeasons = dynamic(() => import("../../TVs/TVSeasons"));
const TVCasts = dynamic(() => import("../../TVs/TVCasts"));
import tvModalStyles from "../../../styles/Home.module.scss";

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
}) => {
  //Tabs
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
        <div className={tvModalStyles["tv-modal-wrapper"]}>
          <div
            onClick={handleCloseTVInfo}
            className={tvModalStyles["tv-modal-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
          <TVTrailer id={id} />

          <div className={tvModalStyles["tv-modal-content"]}>
            <div className={tvModalStyles["tv-modal-title"]}>
              <h1>{name}</h1>
            </div>

            <div className={tvModalStyles["tv-modal-series-info"]}>
              <div className={tvModalStyles["tv-modal-episodes"]}>
                {episodes <= 1 ? (
                  <p>{episodes} Episode</p>
                ) : (
                  <p>{episodes} Episodes</p>
                )}
              </div>

              <div className={tvModalStyles["tv-modal-seasons"]}>
                {seasons <= 1 ? (
                  <p>{seasons} Season</p>
                ) : (
                  <p>{seasons} Seasons</p>
                )}
              </div>
            </div>

            <div className={tvModalStyles["tv-modal-overview"]}>
              <h2>Overview:</h2>
              <div className={tvModalStyles["tv-modal-overview-content"]}>
                {overview !== "" ? (
                  <p>{overview}</p>
                ) : (
                  <p>Overview Unvailable...</p>
                )}
              </div>
            </div>

            <div className={tvModalStyles["tv-modal-date-aired"]}>
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

            <div className={tvModalStyles["tv-modal-status"]}>
              <p>Status: {status}</p>
            </div>

            <div className={tvModalStyles["tv-modal-genres"]}>
              <h2>Genres: </h2>
              {genresTV.map((genreTV) => {
                return (
                  <div
                    key={genreTV.id}
                    className={tvModalStyles["tv-modal-genre-name"]}
                  >
                    <p> - {genreTV.name}</p>
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
                <Tab label="Episodes" {...a11yProps(0)} />
                <Tab label="Casts" {...a11yProps(1)} />
                <Tab label="Similar TV" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <TVSeasons seasons={seasons} id={id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TVCasts id={id} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SimilarTV id={id} />
            </TabPanel>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TVModal;
