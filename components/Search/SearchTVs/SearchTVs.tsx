import React, { FC, useState, useEffect, createContext } from "react";
import { useDebounceValue } from "../../../hooks/useDebounceValue";
import Axios from "axios";
import { options } from "../../../utils/options";
import dynamic from "next/dynamic";
const SearchTVInfo = dynamic(() => import("./SearchTVInfo"));
import SearchTVsInput from "../../Inputs/SearchTVs/SearchTVsInput";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../../../styles/Search/SearchTVs/SearchTVs.module.scss";

export const SearchTVIDContext = createContext(0);

interface SearchTVProps {
  searchTVData: {
    id: number;
    poster_path: string;
    vote_average: number;
  }[];
}

const SearchTVs: FC = () => {
  const [searchTVs, setSearchTVs] = useState<SearchTVProps["searchTVData"]>([]);

  const [searchQuery, setSearchQuery] = useDebounceValue("", 650);

  const [loadingSearches, setLoadingSearches] = useState(false);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setLoadingSearches(true);
    let isMounted = true;
    const displaySearchTVs = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/search/tv?language=en-US&page=1&query=${searchQuery}&include_adult=false`,
          options
        );
        // console.log(res.data.results);
        if (isMounted) {
          setSearchTVs(res.data.results);
          setLoadingSearches(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displaySearchTVs();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  //If there are no searched tv shows available
  const noResultsFound = (): JSX.Element | undefined => {
    if (searchQuery !== "" && searchTVs.length === 0 && !loadingSearches) {
      return (
        <div className={styles["search-tvs-no-results-found"]}>
          <p>
            We tried searching for &quot;{searchQuery}&quot; but we
            couldn&apos;t find it. Please check your spelling or try searching
            in the Movies tab.
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles["search-tvs-input"]}>
        <SearchTVsInput handleSearchChange={handleSearchChange} />
      </div>

      {searchQuery === "" ? null : (
        <p className={styles["search-tvs-guide"]}>
          Search results for: {searchQuery}
        </p>
      )}

      {noResultsFound()}

      {loadingSearches ? (
        <div className={styles["search-tvs-loading"]}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={styles["search-tvs-results"]}>
          {searchTVs
            .filter((searchTV) => searchTV.poster_path !== null)
            .map((searchTV) => {
              return (
                <div key={searchTV.id}>
                  <br />
                  <SearchTVIDContext.Provider value={searchTV.id}>
                    <SearchTVInfo
                      posterPath={searchTV.poster_path}
                      voteAverage={searchTV.vote_average}
                    />
                  </SearchTVIDContext.Provider>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SearchTVs;
