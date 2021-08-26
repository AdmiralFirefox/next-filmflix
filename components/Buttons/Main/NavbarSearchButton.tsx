import React, { FC } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

interface NavbarSearchButtonProps {
  searchMode: () => void;
}

const SearchButton = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#303030",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 30%)",
    },
  },
}))(Button);

const NavbarSearchButton: FC<NavbarSearchButtonProps> = ({ searchMode }) => {
  return (
    <>
      <SearchButton
        variant="contained"
        color="primary"
        onClick={searchMode}
        startIcon={<SearchIcon />}
      >
        Search
      </SearchButton>
    </>
  );
};

export default NavbarSearchButton;
