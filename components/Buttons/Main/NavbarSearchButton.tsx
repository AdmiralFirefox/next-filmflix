import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

interface NavbarSearchButtonProps {
  searchMode: () => void;
}

const SearchButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#303030",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 30%)",
  },
}));

const NavbarSearchButton: FC<NavbarSearchButtonProps> = ({ searchMode }) => {
  return (
    <>
      <SearchButton
        variant="contained"
        onClick={searchMode}
        startIcon={<SearchIcon />}
      >
        Search
      </SearchButton>
    </>
  );
};

export default NavbarSearchButton;
