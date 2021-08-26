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
      background: "#757575",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: "min(60vw, 22em)",
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

interface AddProfileModalProps {
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProfileModalInput: FC<AddProfileModalProps> = ({
  handleProfileChange,
}) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Enter Name"
          inputProps={{
            "aria-label": "Enter Name",
            style: {
              color: "#fff",
              fontWeight: "bold",
            },
          }}
          onChange={handleProfileChange}
          defaultValue=""
        />
      </Paper>
    </>
  );
};

export default AddProfileModalInput;
