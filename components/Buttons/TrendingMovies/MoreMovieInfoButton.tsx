import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";

interface MoreInfoButtonProps {
  handleOpenTrendingMovieModal: () => void;
}

const MoreInfoButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "hsl(0, 0%, 33%)",
    marginLeft: "0.85em",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 50%)",
    },
  },
}))(Button);

const MoreMovieInfoButton: FC<MoreInfoButtonProps> = ({
  handleOpenTrendingMovieModal,
}) => {
  return (
    <>
      <MoreInfoButtonClick
        variant="contained"
        color="primary"
        onClick={handleOpenTrendingMovieModal}
        endIcon={<InfoIcon />}
      >
        More Info
      </MoreInfoButtonClick>
    </>
  );
};

export default MoreMovieInfoButton;
