import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import { StaticImageData } from "next/image";

const ManageProfileButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#8C8C8C",
  backgroundColor: "transparent",
  border: "3px solid #8C8C8C",
  fontWeight: "bold",
  transition: "border 0.35s ease-in-out, color 0.35s ease-in-out",
  "&:hover": {
    backgroundColor: "transparent",
    border: "3px solid 	hsl(0, 0%, 80%)",
    color: "hsl(0, 0%, 80%)",
  },
}));

interface ManageProfileButtonProps {
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
  toggleEditMode: () => void;
  editMode: boolean;
}

const ManageProfileButton: FC<ManageProfileButtonProps> = ({
  profiles,
  toggleEditMode,
  editMode,
}) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", margin: "2.5em 0em" }}
    >
      {editMode ? (
        <ManageProfileButtonClick variant="outlined" onClick={toggleEditMode}>
          Save Changes
        </ManageProfileButtonClick>
      ) : (
        <ManageProfileButtonClick
          variant="outlined"
          onClick={toggleEditMode}
          disabled={profiles.length === 0}
        >
          Manage Profiles
        </ManageProfileButtonClick>
      )}
    </Box>
  );
};

export default ManageProfileButton;
