import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface SaveProfilePicButtonProps {
  SubmitProfilePicEdit: (id: number) => void;
  focus: boolean;
  profile: { id: number };
  selectRef: React.MutableRefObject<null>;
}

const EditProfilePic = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

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
