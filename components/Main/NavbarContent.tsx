import React, { FC, useContext } from "react";
import { ProfileNameContext, ProfilePicContext } from "./ProfileSelection";
import Image from "next/image";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import navbarContentStyles from "../../styles/Home.module.scss";

interface NavbarContentProps {
  manageProfiles: () => void;
  signOut: () => Promise<void>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  searchMode: () => void;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#333333",
  },
  divider: {
    background: "#757575",
    height: "0.3em",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

const NavbarContent: FC<NavbarContentProps> = ({
  manageProfiles,
  signOut,
  setCategory,
  searchMode,
}) => {
  const classes = useStyles();
  const profilePic = useContext(ProfilePicContext);
  const profile = useContext(ProfileNameContext);

  const [state, setState] = React.useState({
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
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div className={navbarContentStyles["navbar-content-manage-profile"]}>
          <div className={navbarContentStyles["navbar-content-image"]}>
            <Image src={profilePic} alt="AvatarProfile" priority={true} />
          </div>
          <div
            className={navbarContentStyles["navbar-content-profile-content"]}
          >
            <div className={navbarContentStyles["navbar-content-profile-name"]}>
              <p>{profile}</p>
            </div>
            <div
              className={
                navbarContentStyles["navbar-content-manage-profile-name"]
              }
              onClick={manageProfiles}
            >
              <p>Manage Profiles</p>
            </div>
          </div>
        </div>
        <div className={navbarContentStyles["navbar-content-manage-category"]}>
          <div
            className={navbarContentStyles["navbar-content-search"]}
            onClick={searchMode}
          >
            <SearchIcon fontSize="large" style={littleMargin} />
            <p>Search</p>
          </div>
          <div onClick={toggleDrawer(anchor, false)}>
            <div
              className={navbarContentStyles["navbar-content-movie-category"]}
              onClick={() => setCategory("Movies")}
            >
              <MovieIcon fontSize="large" style={littleMargin} />
              <p>Movies</p>
            </div>
          </div>
          <div onClick={toggleDrawer(anchor, false)}>
            <div
              className={navbarContentStyles["navbar-content-tv-category"]}
              onClick={() => setCategory("TVs")}
            >
              <TvIcon fontSize="large" style={littleMargin} />
              <p>TV Shows</p>
            </div>
          </div>
          <div
            className={navbarContentStyles["navbar-content-signout"]}
            onClick={signOut}
          >
            <ExitToAppIcon fontSize="large" style={littleMargin} />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {(["right"] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ fill: "#fff", fontSize: "2rem" }} />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            classes={{ paper: classes.paper }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavbarContent;
