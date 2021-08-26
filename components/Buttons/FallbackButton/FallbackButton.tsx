import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const FallbackButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#000",
    backgroundColor: "hsl(0, 0%, 100%)",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 80%)",
    },
  },
}))(Button);

const FallbackButton: FC = () => {
  return (
    <>
      <FallbackButtonClick
        variant="contained"
        color="primary"
        endIcon={<PlayArrowIcon />}
      >
        Play
      </FallbackButtonClick>
    </>
  );
};

export default FallbackButton;
