import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

interface AddProfileModalProps {
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddProfileModalInput: FC<AddProfileModalProps> = ({
  handleProfileChange,
}) => {
  return (
    <>
      <Paper
        sx={{
          padding: "0.5em",
          display: "flex",
          justifyContent: "center",
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
          onChange={handleProfileChange}
          defaultValue=""
        />
      </Paper>
    </>
  );
};

export default AddProfileModalInput;
