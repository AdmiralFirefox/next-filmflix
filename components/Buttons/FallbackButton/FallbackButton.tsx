import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const FallbackButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(0, 0%, 100%)",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 80%)",
  },
}));

const FallbackButton: FC = () => {
  return (
    <>
      <FallbackButtonClick variant="contained" endIcon={<PlayArrowIcon />}>
        Play
      </FallbackButtonClick>
    </>
  );
};

export default FallbackButton;
