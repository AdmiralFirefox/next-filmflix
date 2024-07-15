import React, { FC, useState, useEffect, createContext } from "react";
import { useDebounceValue } from "../../../hooks/useDebounceValue";
import Axios from "axios";
import dynamic from "next/dynamic";
const SearchMovieInfo = dynamic(() => import("./SearchMovieInfo"));
import SearchMoviesInput from "../../Inputs/SearchMovies/SearchMoviesInput";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../../../styles/Search/SearchMovies/SearchMovies.module.scss";

export const SearchMovieIDContext = createContext(0);

interface SearchMovieProps {
  searchMovieData: { id: number; poster_path: string; vote_average: number }[];
}

const SearchMovies: FC = () => {
  const [searchMovies, setSearchMovies] = useState<
    SearchMovieProps["searchMovieData"]
  >([]);

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
    const displaySearchMovies = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        );
        // console.log(res.data.results);
        if (isMounted) {
          setSearchMovies(res.data.results);
          setLoadingSearches(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displaySearchMovies();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  //If there are no searched movies available
  const noResultsFound = (): JSX.Element | undefined => {
    if (searchQuery !== "" && searchMovies.length === 0 && !loadingSearches) {
      return (
        <div className={styles["search-movies-no-results-found"]}>
          <p>
            We tried searching for &quot;{searchQuery}&quot; but we
            couldn&apos;t find it. Please check your spelling or try searching
            in the TV Shows tab.
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles["search-movies-input"]}>
        <SearchMoviesInput handleSearchChange={handleSearchChange} />
      </div>

      {searchQuery === "" ? null : (
        <p className={styles["search-movies-guide"]}>
          Search results for: {searchQuery}
        </p>
      )}

      {noResultsFound()}

      {loadingSearches ? (
        <div className={styles["search-movies-loading"]}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={styles["search-movies-results"]}>
          {searchMovies
            .filter((searchMovie) => searchMovie.poster_path !== null)
            .map((searchMovie) => {
              return (
                <div key={searchMovie.id}>
                  <br />
                  <SearchMovieIDContext.Provider value={searchMovie.id}>
                    <SearchMovieInfo
                      posterPath={searchMovie.poster_path}
                      voteAverge={searchMovie.vote_average}
                    />
                  </SearchMovieIDContext.Provider>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SearchMovies;
