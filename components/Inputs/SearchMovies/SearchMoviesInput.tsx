import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "min(80%, 30em)",
      background: "#757575",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchMoviesInputProps {
  handleSearchChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const SearchMoviesInput: FC<SearchMoviesInputProps> = ({
  handleSearchChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Movies..."
          inputProps={{
            "aria-label": "search google maps",
            style: { color: "#fff", fontWeight: "bold" },
          }}
          onChange={handleSearchChange}
        />
      </Paper>
    </>
  );
};

export default SearchMoviesInput;
