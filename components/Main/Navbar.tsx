import React, { FC, useState, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import WebLogo from "../../assets/logo/WebLogo.png";
import { ProfilePicContext } from "./ProfileSelection";
const NavbarContent = dynamic(() => import("./NavbarContent"));
import NavbarSearchButton from "../Buttons/Main/NavbarSearchButton";
import styles from "../../styles/Main/Navbar.module.scss";

//Material UI Dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface NavbarProps {
  manageProfiles: () => void;
  handleCategoryChange: (event: SelectChangeEvent) => void;
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
          ? styles["navbar-wrapper-active"]
          : styles["navbar-wrapper"]
      }
    >
      <div className={styles["navbar-set"]}>
        <div className={styles["site-logo"]}>
          <Image
            src={WebLogo}
            alt="Web Logo"
            width={150}
            height={50}
            objectFit="cover"
          />
        </div>
        <div className={styles["navbar-dropdown"]}>
          <FormControl
            variant="filled"
            sx={{
              background: "#303030 ",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            <InputLabel
              id="demo-simple-select-filled-label"
              sx={{ color: "#fff" }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleCategoryChange}
              value={category}
              sx={{ color: "#fff" }}
              MenuProps={{
                sx: {
                  ".MuiPaper-root": {
                    background: "none",
                    boxShadow: "none",
                  },
                  ".MuiMenu-list": {
                    backgroundColor: "#303030",
                  },

                  ".MuiMenuItem-root": {
                    color: "#fff",
                    transition: "background 0.2s ease-in-out",

                    "&:hover": {
                      backgroundColor: "#555",
                    },
                  },
                  "&& .Mui-selected": {
                    background: "#555 ",

                    "&:hover": {
                      backgroundColor: "#555",
                    },
                  },
                },
              }}
            >
              <MenuItem value="Movies">Movies</MenuItem>
              <MenuItem value="TVs">TVs</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={styles["navbar-manage"]}>
        <div className={styles["navbar-search-button-wrapper"]}>
          <NavbarSearchButton searchMode={searchMode} />
        </div>

        <div
          className={styles["navbar-manage-image"]}
          onClick={handleOpenProfileModal}
        >
          <Image src={profilePic} alt="Avatar Profile" />
        </div>

        <div className={styles["navbar-hamburger"]}>
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
