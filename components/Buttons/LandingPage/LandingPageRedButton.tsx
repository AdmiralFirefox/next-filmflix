import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const LandingPageRedButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#e50914",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

const LandingPageRedButton: FC = ({ children }) => {
  return (
    <>
      <LandingPageRedButtonClick variant="contained" color="primary">
        {children}
      </LandingPageRedButtonClick>
    </>
  );
};

export default LandingPageRedButton;
