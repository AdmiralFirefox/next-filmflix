import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
import Axios from "axios";
const TrendingMovieInfo = dynamic(() => import("./TrendingMovieInfo"));
import Skeleton from "@material-ui/lab/Skeleton";
import trendingMovieStyles from "../../../styles/Home.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

export const TrendingMovieIDContext = createContext(0);

const TrendingMovies: FC = () => {
  const [trendingMovie, setTrendingMovie] = useState({
    id: 0,
    backdrop_path: "",
    title: "",
    overview: "",
  });
  const [isMounted, setIsMounted] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const displayTrendingMovies = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${NEXT_PUBLIC_API_KEY}`
        );
        // console.log(res.data.results[1]);
        if (isMounted) {
          setTrendingMovie(res.data.results[Math.floor(Math.random() * 10)]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTrendingMovies();

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton
            variant="rect"
            id={trendingMovieStyles["trending-movies-loading-skeleton"]}
          />
        </>
      ) : (
        <>
          {trendingMovie.id !== 0 ? (
            <>
              <TrendingMovieIDContext.Provider value={trendingMovie.id}>
                <TrendingMovieInfo
                  backdropPath={trendingMovie.backdrop_path}
                  title={trendingMovie.title}
                  overview={trendingMovie.overview}
                />
              </TrendingMovieIDContext.Provider>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TrendingMovies;
