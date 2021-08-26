import React, { FC, useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import WebLogo from "../../assets/logo/WebLogo.png";
import { ProfilePicContext } from "./ProfileSelection";
const NavbarContent = dynamic(() => import("./NavbarContent"));
import NavbarSearchButton from "../Buttons/Main/NavbarSearchButton";
import navbarStyles from "../../styles/Home.module.scss";

//Material UI Dropdown
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface NavbarProps {
  manageProfiles: () => void;
  handleCategoryChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
  signOut: () => Promise<void>;
  searchMode: () => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  handleOpenProfileModal: () => void;
}

const Navbar: FC<NavbarProps> = ({
  manageProfiles,
  handleCategoryChange,
  signOut,
  searchMode,
  setCategory,
  category,
  handleOpenProfileModal,
}) => {
  const profilePic = useContext(ProfilePicContext);

  const [isMounted, setIsMounted] = useState(true);

  //Active Navbar Background
  const [navbackground, setNavBackground] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 90) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    if (isMounted) {
      window.addEventListener("scroll", changeBackground);
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <div
      className={
        navbackground
          ? navbarStyles["navbar-wrapper-active"]
          : navbarStyles["navbar-wrapper"]
      }
    >
      <div className={navbarStyles["navbar-set"]}>
        <div className={navbarStyles["site-logo"]}>
          <Image src={WebLogo} alt="Web Logo" width={150} height={50} objectFit="cover" />
        </div>
        <div className={navbarStyles["navbar-dropdown"]}>
          <FormControl variant="filled">
            <InputLabel
              id="demo-simple-select-filled-label"
              style={{ color: "#fff" }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleCategoryChange}
              value={category}
              style={{ color: "#fff", background: "#303030" }}
            >
              <MenuItem value="Movies">Movies</MenuItem>
              <MenuItem value="TVs">TVs</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={navbarStyles["navbar-manage"]}>
        <div className={navbarStyles["navbar-search-button-wrapper"]}>
          <NavbarSearchButton searchMode={searchMode} />
        </div>

        <div
          className={navbarStyles["navbar-manage-image"]}
          onClick={handleOpenProfileModal}
        >
          <Image src={profilePic} alt="Avatar Profile" />
        </div>

        <div className={navbarStyles["navbar-hamburger"]}>
          <NavbarContent
            manageProfiles={manageProfiles}
            signOut={signOut}
            setCategory={setCategory}
            searchMode={searchMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
