import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface PlayMovieButtonProps {
  handleOpenMovieVideoPlayer: () => void;
}

const PlayButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "#fff",
  width: "90%",
  padding: "0.5em",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 80%)",
  },
}));

const PlayMovieButton: FC<PlayMovieButtonProps> = ({
  handleOpenMovieVideoPlayer,
}) => {
  return (
    <>
      <PlayButton
        variant="contained"
        onClick={handleOpenMovieVideoPlayer}
        endIcon={<PlayArrowIcon />}
      >
        Play
      </PlayButton>
    </>
  );
};

export default PlayMovieButton;
