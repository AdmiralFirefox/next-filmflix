import React, { FC } from "react";
import dynamic from "next/dynamic";
import SearchNavbar from "./SearchNavbar";
const SearchTabs = dynamic(() => import("./SearchTabs"));

interface SearchProps {
  closeSearch: () => void;
  handleOpenProfileModal: () => void;
}

const Search: FC<SearchProps> = ({ closeSearch, handleOpenProfileModal }) => {
  return (
    <div>
      <SearchNavbar closeSearch={closeSearch} handleOpenProfileModal={handleOpenProfileModal} />
      <SearchTabs />
    </div>
  );
};

export default Search;
