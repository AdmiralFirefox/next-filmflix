import React, { FC, useContext } from "react";
import Image from "next/image";
import { ProfilePicContext } from "../Main/ProfileSelection";
import searchNavbarStyles from "../../styles/Home.module.scss";

interface SearchProps {
  closeSearch: () => void;
  handleOpenProfileModal: () => void;
}

const SearchNavbar: FC<SearchProps> = ({ closeSearch, handleOpenProfileModal }) => {
  const profilePic = useContext(ProfilePicContext);

  return (
    <div className={searchNavbarStyles["search-navbar-wrapper"]}>
      <div className={searchNavbarStyles["search-navbar-image"]} onClick={handleOpenProfileModal}>
        <Image src={profilePic} alt="Avatar Profile" priority={true} />
      </div>
      <div
        className={searchNavbarStyles["search-navbar-close-icon"]}
        onClick={closeSearch}
      >
        <i className="fas fa-arrow-alt-circle-left"></i>
      </div>
    </div>
  );
};

export default SearchNavbar;
