import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

interface EditProfileModalInputProps {
  setProfileTextEdit: React.Dispatch<React.SetStateAction<string>>;
  profile: { name: string };
}

const EditProfileModalInput: FC<EditProfileModalInputProps> = ({
  setProfileTextEdit,
  profile,
}) => {
  return (
    <>
      <Paper
        sx={{
          padding: "0.5em",
          display: "flex",
          alignItems: "center",
          background: "#757575",
          width: "min(60vw, 25em)",
        }}
      >
        <InputBase
          placeholder="Enter Name"
          inputProps={{
            "aria-label": "Enter Name",
          }}
          sx={{ color: "#fff", fontWeight: "bold", ml: 1, flex: 1 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileTextEdit(e.target.value)
          }
          defaultValue={profile.name}
        />
      </Paper>
    </>
  );
};

export default EditProfileModalInput;
