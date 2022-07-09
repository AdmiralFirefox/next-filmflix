import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
import Axios from "axios";
const MovieInfo = dynamic(() => import("./MovieInfo"));
import Skeleton from "@mui/material/Skeleton";
import styles from "../../styles/Movies/MovieCarousel.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Virtual } from "swiper";

// install Swiper and Virtual modules
SwiperCore.use([Navigation, Virtual]);

interface RouteProp {
  route: string;
  title: string;
}

interface MovieProp {
  movieData: {
    id: number;
    poster_path: string;
    vote_average: number;
  }[];
}

export const MovieIDContext = createContext(0);

const MovieCarousel: FC<RouteProp> = ({ route, title }) => {
  const [movies, setMovies] = useState<MovieProp["movieData"]>([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const breakpoints: {} = {
    "270": {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    "320": {
      slidesPerView: 3,
      spaceBetween: 6,
    },
    "640": {
      slidesPerView: 4,
      spaceBetween: 8,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 8,
    },
    "1024": {
      slidesPerView: 6,
      spaceBetween: 8,
    },
    "1200": {
      slidesPerView: 7,
      spaceBetween: 8,
    },
    "2000": {
      slidesPerView: 10,
      spaceBetween: 8,
    },
    "4000": {
      slidesPerView: 13,
      spaceBetween: 8,
    },
  };

  useEffect(() => {
    setLoading(true);
    const displayTrendingMovies = async () => {
      try {
        const res = await Axios.get(`${route}`);
        // console.log(res.data.results);
        if (isMounted) {
          setMovies(res.data.results);
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
  }, [route, isMounted]);

  return (
    <div>
      {loading ? null : (
        <>
          <div className={styles["movie-carousel-info-title"]}>
            <p>{title}:</p>
          </div>
          <span className={styles["movie-carousel-fade-effect"]}></span>
        </>
      )}

      <Swiper
        spaceBetween={8}
        slidesPerView={7}
        navigation={true}
        breakpoints={breakpoints}
        className="my-swiper-container"
        virtual
      >
        {loading ? (
          <>
            {[...Array(movies.length)].map((_e, i) => {
              return (
                <SwiperSlide key={i} virtualIndex={i}>
                  <Skeleton
                    variant="rectangular"
                    width={210}
                    height={250}
                    sx={{ background: "#757575", borderRadius: "8px" }}
                  />
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <>
            {movies
              .filter((movie) => movie.poster_path !== null)
              .map((movie) => {
                return (
                  <SwiperSlide key={movie.id} virtualIndex={movie.id}>
                    <MovieIDContext.Provider value={movie.id}>
                      <MovieInfo
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                      />
                    </MovieIDContext.Provider>
                  </SwiperSlide>
                );
              })}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
