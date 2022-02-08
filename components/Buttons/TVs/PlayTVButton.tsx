import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface PlayTVButtonProps {
  handleOpenTVVideoPlayer: () => void;
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

const PlayTVButton: FC<PlayTVButtonProps> = ({ handleOpenTVVideoPlayer }) => {
  return (
    <>
      <PlayButton
        variant="contained"
        onClick={handleOpenTVVideoPlayer}
        endIcon={<PlayArrowIcon />}
      >
        Play
      </PlayButton>
    </>
  );
};

export default PlayTVButton;
