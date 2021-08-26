import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface AddProfileModalButtonProps {
  profile: string;
}

const AddProfileButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0071EB",
    "&:hover": {
      backgroundColor: "hsl(211, 100%, 60%)",
    },
  },
}))(Button);

const AddProfileModalButton: FC<AddProfileModalButtonProps> = ({ profile }) => {
  return (
    <>
      <AddProfileButton
        variant="contained"
        color="primary"
        type="submit"
        disabled={!profile}
      >
        Add Profile
      </AddProfileButton>
    </>
  );
};

export default AddProfileModalButton;
