import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

interface SearchTVsInputProps {
  handleSearchChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const SearchTVsInput: FC<SearchTVsInputProps> = ({ handleSearchChange }) => {
  return (
    <>
      <Paper
        sx={{
          padding: "0.5em",
          display: "flex",
          alignItems: "center",
          width: "min(80%, 30em)",
          background: "#757575",
        }}
      >
        <InputBase
          placeholder="Search TV Shows..."
          inputProps={{
            "aria-label": "Search TV Shows",
          }}
          sx={{ color: "#fff", fontWeight: "bold", ml: 1, flex: 1 }}
          onChange={handleSearchChange}
        />
      </Paper>
    </>
  );
};

export default SearchTVsInput;
