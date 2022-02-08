import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface SubmitEditProfileButtonProps {
  SubmitProfileEdit: (id: number) => void;
  profile: { id: number };
  profileTextEdit: string;
}

const EditProfileButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const SubmitEditProfileButton: FC<SubmitEditProfileButtonProps> = ({
  SubmitProfileEdit,
  profile,
  profileTextEdit,
}) => {
  return (
    <>
      <EditProfileButton
        variant="contained"
        onClick={() => SubmitProfileEdit(profile.id)}
        disabled={!profileTextEdit}
      >
        Submit Edit
      </EditProfileButton>
    </>
  );
};

export default SubmitEditProfileButton;
