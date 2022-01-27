import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import dynamic from "next/dynamic";
import ProfileLoader from "./ProfileLoader";
const Movies = dynamic(() => import("../Movies/Movies"));
const Navbar = dynamic(() => import("./Navbar"));
const TVs = dynamic(() => import("../TVs/TVs"));
const TrendingMovies = dynamic(
  () => import("../Trending/TrendingMovies/TrendingMovies")
);
const TrendingTVs = dynamic(
  () => import("../Trending/TrendingTVs/TrendingTVs")
);
const Search = dynamic(() => import("../Search/Search"));
const ProfileModal = dynamic(() => import("../Modal/Main/ProfileModal"));

interface MainProps {
  manageProfiles: () => void;
  signOut: () => Promise<void>;
}

const Main: FC<MainProps> = ({ manageProfiles, signOut }) => {
  //Changing Categories
  const [category, setCategory] = useState("Movies");

  //Search Functions
  const [search, setSearch] = useState(false);

  const searchMode = (): void => setSearch(true);

  const closeSearch = (): void => {
    setSearch(false);
    setCategory("Movies");
  };

  //Transition Animation Between Profile Loader and Main Content
  const fadeInProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2000,
    config: { duration: 2000 },
  });

  const fadeOutProps = useSpring({
    from: { opacity: 1, display: "inline" },
    to: { opacity: 0, display: "none" },
    delay: 2000,
    config: { duration: 2000 },
  });

  //Handling Changes in Changing Category
  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as unknown as string);
  };

  //Profile Modal
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleOpenProfileModal = (): void => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = (): void => {
    setOpenProfileModal(false);
  };

  //If the user wants to search a movie/tv
  const searchMedia = (): JSX.Element => {
    if (search === true) {
      return (
        <>
          <Search
            closeSearch={closeSearch}
            handleOpenProfileModal={handleOpenProfileModal}
          />
        </>
      );
    } else {
      return (
        <>
          <Navbar
            manageProfiles={manageProfiles}
            handleCategoryChange={handleCategoryChange}
            signOut={signOut}
            searchMode={searchMode}
            setCategory={setCategory}
            category={category}
            handleOpenProfileModal={handleOpenProfileModal}
          />
          {category === "Movies" ? (
            <>
              <TrendingMovies />
              {/* <Movies /> */}
            </>
          ) : (
            <>
              <TrendingTVs />
              {/* <TVs /> */}
            </>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <animated.div style={fadeOutProps}>
        <ProfileLoader />
      </animated.div>

      <animated.div style={fadeInProps}>
        <ProfileModal
          openProfileModal={openProfileModal}
          handleCloseProfileModal={handleCloseProfileModal}
          manageProfiles={manageProfiles}
          signOut={signOut}
        />
        {searchMedia()}
      </animated.div>
    </div>
  );
};

export default Main;
