import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface SaveProfilePicButtonProps {
  SubmitProfilePicEdit: (id: number) => void;
  focus: boolean;
  profile: { id: number };
  selectRef: React.MutableRefObject<null>;
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
  selectRef,
}) => {
  return (
    <>
      <EditProfilePic
        variant="contained"
        color="primary"
        onClick={() => SubmitProfilePicEdit(profile.id)}
        disabled={!focus}
        ref={selectRef}
      >
        Save Changes
      </EditProfilePic>
    </>
  );
};

export default SaveProfilePicButton;
