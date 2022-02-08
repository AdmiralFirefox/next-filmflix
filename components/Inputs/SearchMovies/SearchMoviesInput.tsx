import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

interface SearchMoviesInputProps {
  handleSearchChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const SearchMoviesInput: FC<SearchMoviesInputProps> = ({
  handleSearchChange,
}) => {
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
          placeholder="Search Movies..."
          inputProps={{
            "aria-label": "Search Movies",
          }}
          sx={{ color: "#fff", fontWeight: "bold", ml: 1, flex: 1 }}
          onChange={handleSearchChange}
        />
      </Paper>
    </>
  );
};

export default SearchMoviesInput;
