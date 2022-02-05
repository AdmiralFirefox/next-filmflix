import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TVEpisodes from "./TVEpisodes";
import styles from "../../styles/TVs/TVSeasons.module.scss";

interface SeasonProp {
  seasons: number;
  id: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const TVSeasons: FC<SeasonProp> = ({ seasons, id }) => {
  const classes = useStyles();
  const [currentSeason, setCurrentSeason] = useState("1");

  const handleSeasonChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentSeason(event.target.value as unknown as string);
  };

  return (
    <div>
      <div className={styles["tv-seasons-title"]}>
        <h1>Season:</h1>
      </div>
      <FormControl variant="filled" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleSeasonChange}
          value={currentSeason}
          style={{ color: "#fff", background: "#666", fontWeight: "bold" }}
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
