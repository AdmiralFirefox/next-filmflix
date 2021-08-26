import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ManageProfileButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#8C8C8C",
    backgroundColor: "transparent",
    border: "3px solid #8C8C8C",
    margin: "2.5em 0em",
    fontWeight: "bold",
    transition: "border 0.35s ease-in-out, color 0.35s ease-in-out",
    "&:hover": {
      backgroundColor: "transparent",
      border: "3px solid 	hsl(0, 0%, 80%)",
      color: "hsl(0, 0%, 80%)",
    },
  },
}))(Button);

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
    <div>
      {editMode ? (
        <ManageProfileButtonClick
          variant="outlined"
          color="primary"
          onClick={toggleEditMode}
        >
          Save Changes
        </ManageProfileButtonClick>
      ) : (
        <ManageProfileButtonClick
          variant="outlined"
          color="primary"
          onClick={toggleEditMode}
          disabled={profiles.length === 0}
        >
          Manage Profiles
        </ManageProfileButtonClick>
      )}
    </div>
  );
};

export default ManageProfileButton;
