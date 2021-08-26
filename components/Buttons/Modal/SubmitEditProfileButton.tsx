import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface SubmitEditProfileButtonProps {
  SubmitProfileEdit: (id: number) => void;
  profile: { id: number };
  profileTextEdit: string;
}

const EditProfileButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0071EB",
    "&:hover": {
      backgroundColor: "hsl(211, 100%, 60%)",
    },
  },
}))(Button);

const SubmitEditProfileButton: FC<SubmitEditProfileButtonProps> = ({
  SubmitProfileEdit,
  profile,
  profileTextEdit,
}) => {
  return (
    <>
      <EditProfileButton
        variant="contained"
        color="primary"
        onClick={() => SubmitProfileEdit(profile.id)}
        disabled={!profileTextEdit}
      >
        Submit Edit
      </EditProfileButton>
    </>
  );
};

export default SubmitEditProfileButton;
