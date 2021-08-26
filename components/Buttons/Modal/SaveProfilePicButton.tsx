import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface SaveProfilePicButtonProps {
  SubmitProfilePicEdit: (id: number) => void;
  focus: boolean;
  profile: { id: number };
}

const EditProfilePic = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0071EB",
    "&:hover": {
      backgroundColor: "hsl(211, 100%, 60%)",
    },
  },
}))(Button);

const SaveProfilePicButton: FC<SaveProfilePicButtonProps> = ({
  SubmitProfilePicEdit,
  focus,
  profile,
}) => {
  return (
    <>
      <EditProfilePic
        variant="contained"
        color="primary"
        onClick={() => SubmitProfilePicEdit(profile.id)}
        disabled={!focus}
      >
        Save Changes
      </EditProfilePic>
    </>
  );
};

export default SaveProfilePicButton;
