import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
const TVInfo = dynamic(() => import("./TVInfo"));
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import tvCarouselStyles from "../../styles/Home.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

interface TVShowsRouteProps {
  route: string;
  title: string;
}

interface TVShowsProps {
  tvShowData: {
    id: number;
    poster_path: string;
    vote_average: number;
  }[];
}

export const TVIDContext = createContext(0);

const TVCarousel: FC<TVShowsRouteProps> = ({ route, title }) => {
  const [tvShows, setTvShows] = useState<TVShowsProps["tvShowData"]>([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [show, setShow] = useState(false);

  const breakpoints: {} = {
    "280": {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    "640": {
      slidesPerView: 3,
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
    const displayTVShows = async () => {
      try {
        const res = await Axios.get(`${route}`);
        // console.log(res.data.results);
        if (isMounted) {
          setTvShows(res.data.results);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTVShows();

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
      <div className={tvCarouselStyles["tv-carousel-info-title"]}>
        {show ? <>{loading ? null : <p>{title}:</p>}</> : null}
      </div>

      {show ? (
        <>
          {loading ? null : (
            <span
              className={tvCarouselStyles["tv-carousel-fade-effect"]}
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
                style={{ background: "#757575" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton
                variant="rect"
                width={210}
                height={250}
                style={{ background: "#757575" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Skeleton
                variant="rect"
                width={210}
                height={250}
                style={{ background: "#757575" }}
              />
            </SwiperSlide>
          </>
        ) : (
          <>
            {tvShows.map((tvShow) => {
              return (
                <SwiperSlide key={tvShow.id}>
                  <TVIDContext.Provider value={tvShow.id}>
                    <TVInfo
                      posterPath={tvShow.poster_path}
                      voteAverage={tvShow.vote_average}
                    />
                  </TVIDContext.Provider>
                </SwiperSlide>
              );
            })}
          </>
        )}
      </Swiper>
    </div>
  );
};

export default TVCarousel;
