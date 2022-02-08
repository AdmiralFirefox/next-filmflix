import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface AddProfileModalButtonProps {
  profile: string;
}

const AddProfileButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const AddProfileModalButton: FC<AddProfileModalButtonProps> = ({ profile }) => {
  return (
    <>
      <AddProfileButton variant="contained" type="submit" disabled={!profile}>
        Add Profile
      </AddProfileButton>
    </>
  );
};

export default AddProfileModalButton;
