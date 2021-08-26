import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";

interface MoreInfoButtonProps {
  handleOpenTrendingTVModal: () => void;
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

const MoreTVInfoButton: FC<MoreInfoButtonProps> = ({
  handleOpenTrendingTVModal,
}) => {
  return (
    <>
      <MoreInfoButtonClick
        variant="contained"
        color="primary"
        onClick={handleOpenTrendingTVModal}
        endIcon={<InfoIcon />}
      >
        More Info
      </MoreInfoButtonClick>
    </>
  );
};

export default MoreTVInfoButton;
