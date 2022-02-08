import React, { FC, useContext, useState } from "react";
import { ProfileNameContext, ProfilePicContext } from "./ProfileSelection";
import Image from "next/image";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import styles from "../../styles/Main/NavbarContent.module.scss";

interface NavbarContentProps {
  manageProfiles: () => void;
  signOut: () => Promise<void>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  searchMode: () => void;
}

type Anchor = "top" | "left" | "bottom" | "right";

const NavbarContent: FC<NavbarContentProps> = ({
  manageProfiles,
  signOut,
  setCategory,
  searchMode,
}) => {
  const profilePic = useContext(ProfilePicContext);
  const profile = useContext(ProfileNameContext);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const littleMargin = {
    marginRight: "0.2em",
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div className={styles["navbar-content-manage-profile"]}>
          <div className={styles["navbar-content-image"]}>
            <Image src={profilePic} alt="AvatarProfile" priority={true} />
          </div>
          <div className={styles["navbar-content-profile-content"]}>
            <div className={styles["navbar-content-profile-name"]}>
              <p>{profile}</p>
            </div>
            <div
              className={styles["navbar-content-manage-profile-name"]}
              onClick={manageProfiles}
            >
              <p>Manage Profiles</p>
            </div>
          </div>
        </div>
        <div className={styles["navbar-content-manage-category"]}>
          <div className={styles["navbar-content-search"]} onClick={searchMode}>
            <SearchIcon fontSize="large" style={littleMargin} />
            <p>Search</p>
          </div>
          <div onClick={toggleDrawer(anchor, false)}>
            <div
              className={styles["navbar-content-movie-category"]}
              onClick={() => setCategory("Movies")}
            >
              <MovieIcon fontSize="large" style={littleMargin} />
              <p>Movies</p>
            </div>
          </div>
          <div onClick={toggleDrawer(anchor, false)}>
            <div
              className={styles["navbar-content-tv-category"]}
              onClick={() => setCategory("TVs")}
            >
              <TvIcon fontSize="large" style={littleMargin} />
              <p>TV Shows</p>
            </div>
          </div>
          <div className={styles["navbar-content-signout"]} onClick={signOut}>
            <ExitToAppIcon fontSize="large" style={littleMargin} />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ color: "#fff", fontSize: "2rem" }} />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavbarContent;
