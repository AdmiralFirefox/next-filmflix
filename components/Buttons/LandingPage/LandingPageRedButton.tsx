import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const LandingPageRedButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#e50914",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

const LandingPageRedButton: FC = ({ children }) => {
  return (
    <>
      <LandingPageRedButtonClick variant="contained">
        {children}
      </LandingPageRedButtonClick>
    </>
  );
};

export default LandingPageRedButton;
