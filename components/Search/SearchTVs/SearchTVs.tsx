import React, { FC, useState, useEffect, createContext } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");

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
        const res = await Axios.get(`
        https://api.themoviedb.org/3/search/tv?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&page=1&query=${searchQuery}&include_adult=false`);
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

  if (searchQuery === "") {
    setSearchQuery("/");
  }

  return (
    <div>
      <div className={searchTVStyles["search-tvs-input"]}>
        <SearchTVsInput handleSearchChange={handleSearchChange} />
      </div>

      {searchQuery === "/" ? null : (
        <p className={searchTVStyles["search-tvs-guide"]}>
          Search results for: {searchQuery}
        </p>
      )}

      {loadingSearches ? (
        <div className={searchTVStyles["search-tvs-loading"]}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={searchTVStyles["search-tvs-results"]}>
          {searchTVs.map((searchTV) => {
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
    </div>
  );
};

export default SearchTVs;
