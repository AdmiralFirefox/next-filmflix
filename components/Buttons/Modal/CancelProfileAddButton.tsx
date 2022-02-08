import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface CancelProfileAddButtonProps {
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  handleCloseAddProfileModal: () => void;
}

const CancelProfileAddButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#E50914",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

const CancelProfileAddModalButton: FC<CancelProfileAddButtonProps> = ({
  setProfile,
  handleCloseAddProfileModal,
}) => {
  return (
    <>
      <CancelProfileAddButton
        variant="contained"
        onClick={() => {
          setProfile("");
          handleCloseAddProfileModal();
        }}
      >
        Cancel
      </CancelProfileAddButton>
    </>
  );
};

export default CancelProfileAddModalButton;
