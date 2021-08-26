import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface CancelEditProfileButtonProps {
  setProfileEdit: React.Dispatch<React.SetStateAction<number | boolean>>;
  setProfileTextEdit: React.Dispatch<React.SetStateAction<string>>;
}

const CancelEditProfile = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#E50914",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

const CancelEditProfileButton: FC<CancelEditProfileButtonProps> = ({
  setProfileEdit,
  setProfileTextEdit,
}) => {
  return (
    <>
      <CancelEditProfile
        variant="contained"
        color="primary"
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
