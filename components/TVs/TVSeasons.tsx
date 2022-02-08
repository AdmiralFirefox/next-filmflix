import React, { FC, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TVEpisodes from "./TVEpisodes";
import styles from "../../styles/TVs/TVSeasons.module.scss";

interface SeasonProp {
  seasons: number;
  id: number;
}

const TVSeasons: FC<SeasonProp> = ({ seasons, id }) => {
  const [currentSeason, setCurrentSeason] = useState("1");

  const handleSeasonChange = (event: SelectChangeEvent) => {
    setCurrentSeason(event.target.value);
  };

  return (
    <div>
      <div className={styles["tv-seasons-title"]}>
        <h1>Season:</h1>
      </div>
      <FormControl
        variant="filled"
        sx={{
          background: "hsl(0, 0%, 40%) ",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          minWidth: 120,
        }}
      >
        <InputLabel
          id="demo-simple-select-filled-label"
          sx={{
            color: "#fff",
          }}
        >
          Season
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleSeasonChange}
          value={currentSeason}
          sx={{ color: "#fff", borderBottom: "none", border: "none" }}
          MenuProps={{
            sx: {
              ".MuiPaper-root": {
                background: "none",
                boxShadow: "none",
              },
              ".MuiMenu-list": {
                backgroundColor: "#303030",
              },

              ".MuiMenuItem-root": {
                color: "#fff",
                transition: "background 0.2s ease-in-out",

                "&:hover": {
                  backgroundColor: "#555",
                },
              },
              "&& .Mui-selected": {
                background: "#555 ",

                "&:hover": {
                  backgroundColor: "#555",
                },
              },
            },
          }}
        >
          {[...Array(seasons)].map((_e, i) => {
            return (
              <MenuItem key={i} value={i + 1}>
                {i + 1}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className={styles["tv-seasons-episodes-wrapper"]}>
        <TVEpisodes currentSeason={currentSeason} id={id} />
      </div>
    </div>
  );
};

export default TVSeasons;
