import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
import Axios from "axios";
const MovieInfo = dynamic(() => import("./MovieInfo"));
import Skeleton from "@material-ui/lab/Skeleton";
import movieCarouselStyles from "../../styles/Home.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

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
  const [show, setShow] = useState(false);

  const breakpoints: {} = {
    "280": {
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

  //Setting a Timer
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1300);
  }, [show]);

  return (
    <div>
      <div className={movieCarouselStyles["movie-carousel-info-title"]}>
        {show ? <>{loading ? null : <p>{title}:</p>}</> : null}
      </div>

      {show ? (
        <>
          {loading ? null : (
            <span
              className={movieCarouselStyles["movie-carousel-fade-effect"]}
            ></span>
          )}
        </>
      ) : null}

      <Swiper
        spaceBetween={8}
        slidesPerView={7}
        navigation={true}
        loop={true}
        breakpoints={breakpoints}
        freeMode={true}
        className="mySwiper"
      >
        {loading ? (
          <>
            <SwiperSlide>
              <Skeleton
                variant="rect"
                width={210}
                height={250}
                style={{ background: "#757575", borderRadius:"8px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton
                variant="rect"
                width={210}
                height={250}
                style={{ background: "#757575", borderRadius:"8px" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton
                variant="rect"
                width={210}
                height={250}
                style={{ background: "#757575", borderRadius:"8px" }}
              />
            </SwiperSlide>
          </>
        ) : (
          <>
            {movies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
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
