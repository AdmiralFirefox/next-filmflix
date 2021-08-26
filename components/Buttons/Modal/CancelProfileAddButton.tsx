import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface CancelProfileAddButtonProps {
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  handleCloseAddProfileModal: () => void;
}

const CancelProfileAddButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#E50914",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

const CancelProfileAddModalButton: FC<CancelProfileAddButtonProps> = ({
  setProfile,
  handleCloseAddProfileModal,
}) => {
  return (
    <>
      <CancelProfileAddButton
        variant="contained"
        color="primary"
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
