import React, { FC, useState, useEffect, createContext } from "react";
import Axios from "axios";
import dynamic from "next/dynamic";
const SearchMovieInfo = dynamic(() => import("./SearchMovieInfo"));
import SearchMoviesInput from "../../Inputs/SearchMovies/SearchMoviesInput";
import CircularProgress from "@material-ui/core/CircularProgress";
import searchMovieStyles from "../../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

export const SearchMovieIDContext = createContext(0);

interface SearchMovieProps {
  searchMovieData: { id: number; poster_path: string; vote_average: number }[];
}

const SearchMovies: FC = () => {
  const [searchMovies, setSearchMovies] = useState<
    SearchMovieProps["searchMovieData"]
  >([]);

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
    const displaySearchMovies = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
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

  if (searchQuery === "") {
    setSearchQuery("/");
  }

  return (
    <div>
      <div className={searchMovieStyles["search-movies-input"]}>
        <SearchMoviesInput handleSearchChange={handleSearchChange} />
      </div>

      {searchQuery === "/" ? null : (
        <p className={searchMovieStyles["search-movies-guide"]}>
          Search results for: {searchQuery}
        </p>
      )}

      {loadingSearches ? (
        <div className={searchMovieStyles["search-movies-loading"]}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className={searchMovieStyles["search-movies-results"]}>
          {searchMovies.map((searchMovie) => {
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
    </div>
  );
};

export default SearchMovies;
