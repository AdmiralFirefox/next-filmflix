import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface CancelEditProfileButtonProps {
  setProfileEdit: React.Dispatch<React.SetStateAction<number | boolean>>;
  setProfileTextEdit: React.Dispatch<React.SetStateAction<string>>;
}

const CancelEditProfile = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#E50914",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

const CancelEditProfileButton: FC<CancelEditProfileButtonProps> = ({
  setProfileEdit,
  setProfileTextEdit,
}) => {
  return (
    <>
      <CancelEditProfile
        variant="contained"
        onClick={() => {
          setProfileEdit(false);
          setProfileTextEdit("");
        }}
      >
        Cancel
      </CancelEditProfile>
    </>
  );
};

export default CancelEditProfileButton;
