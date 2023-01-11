import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SelectChangeEvent } from "@mui/material/Select";
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

  //Handling Changes in Changing Category
  const handleCategoryChange = (event: SelectChangeEvent) => {
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

  // Local Storage for when the user selects a Category
  useEffect(() => {
    const json = localStorage.getItem("CATEGORY") as string;
    const saveCategory = JSON.parse(json);

    if (saveCategory) {
      setCategory(saveCategory);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(category);
    localStorage.setItem("CATEGORY", json);
  }, [category]);

  // Local Storage when the user Searches for Movies or TVs
  useEffect(() => {
    const json = localStorage.getItem("SEARCH_MODE") as string;
    const saveSearchMode = JSON.parse(json);

    if (saveSearchMode) {
      setSearch(saveSearchMode);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(search);
    localStorage.setItem("SEARCH_MODE", json);
  }, [search]);

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
              <Movies />
            </>
          ) : (
            <>
              <TrendingTVs />
              <TVs />
            </>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <ProfileLoader />

      <ProfileModal
        openProfileModal={openProfileModal}
        handleCloseProfileModal={handleCloseProfileModal}
        manageProfiles={manageProfiles}
        signOut={signOut}
      />
      {searchMedia()}
    </div>
  );
};

export default Main;
