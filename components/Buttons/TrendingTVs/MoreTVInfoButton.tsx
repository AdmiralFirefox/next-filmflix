import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

interface MoreInfoButtonProps {
  handleOpenTrendingTVModal: () => void;
}

const MoreInfoButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(0, 0%, 33%)",
  marginLeft: "0.85em",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 50%)",
  },
}));

const MoreTVInfoButton: FC<MoreInfoButtonProps> = ({
  handleOpenTrendingTVModal,
}) => {
  return (
    <>
      <MoreInfoButtonClick
        variant="contained"
        onClick={handleOpenTrendingTVModal}
        endIcon={<InfoIcon />}
      >
        More Info
      </MoreInfoButtonClick>
    </>
  );
};

export default MoreTVInfoButton;
