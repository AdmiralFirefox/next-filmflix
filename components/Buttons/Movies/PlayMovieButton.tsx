import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Button from "@material-ui/core/Button";

interface PlayMovieButtonProps {
  handleOpenMovieVideoPlayer: () => void;
}

const PlayButton = withStyles((theme: Theme) => ({
  root: {
    color: "#000",
    backgroundColor: "#fff",
    width: "90%",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 80%)",
    },
  },
}))(Button);

const PlayMovieButton: FC<PlayMovieButtonProps> = ({
  handleOpenMovieVideoPlayer,
}) => {
  return (
    <>
      <PlayButton
        variant="contained"
        color="primary"
        onClick={handleOpenMovieVideoPlayer}
        endIcon={<PlayArrowIcon />}
      >
        Play
      </PlayButton>
    </>
  );
};

export default PlayMovieButton;
