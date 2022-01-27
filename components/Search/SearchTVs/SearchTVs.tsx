import React, { FC, useState, useEffect, createContext } from "react";
import useDebounce from "../../../hooks/useDebounce";
import Axios from "axios";
import dynamic from "next/dynamic";
const SearchTVInfo = dynamic(() => import("./SearchTVInfo"));
import SearchTVsInput from "../../Inputs/SearchTVs/SearchTVsInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import searchTVStyles from "../../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

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

  const [searchQuery, setSearchQuery] = useState("/");

  const [loadingSearches, setLoadingSearches] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 650);

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
        const res = await Axios.get(`
        https://api.themoviedb.org/3/search/tv?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1&query=${debouncedSearch}&include_adult=false`);
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
  }, [debouncedSearch]);

  if (searchQuery === "") {
    setSearchQuery("/");
  }

  //If there are no searched tv shows available
  const noResultsFound = (): JSX.Element | undefined => {
    if (
      searchQuery !== "/" &&
      debouncedSearch !== "/" &&
      searchTVs.length === 0 &&
      !loadingSearches
    ) {
      return (
        <div className={searchTVStyles["search-tvs-no-results-found"]}>
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
      <div className={searchTVStyles["search-tvs-input"]}>
        <SearchTVsInput handleSearchChange={handleSearchChange} />
      </div>

      {searchQuery === "/" ? null : (
        <p className={searchTVStyles["search-tvs-guide"]}>
          Search results for: {searchQuery}
        </p>
      )}

      {noResultsFound()}

      {loadingSearches ? (
        <div className={searchTVStyles["search-tvs-loading"]}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={searchTVStyles["search-tvs-results"]}>
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
