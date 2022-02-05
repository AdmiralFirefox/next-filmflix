import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
const TVInfo = dynamic(() => import("./TVInfo"));
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "../../styles/TVs/TVCarousel.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Navigation, Virtual } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

// install Virtual module
SwiperCore.use([Virtual]);

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

  return (
    <div>
      {loading ? null : (
        <>
          <div className={styles["tv-carousel-info-title"]}>
            <p>{title}:</p>
          </div>
          <span className={styles["tv-carousel-fade-effect"]}></span>
        </>
      )}

      <Swiper
        spaceBetween={8}
        slidesPerView={7}
        navigation={true}
        breakpoints={breakpoints}
        className="mySwiper"
        virtual
      >
        {loading ? (
          <>
            {[...Array(8)].map((_e, i) => {
              return (
                <SwiperSlide key={i} virtualIndex={i}>
                  <Skeleton
                    variant="rect"
                    width={210}
                    height={250}
                    style={{ background: "#757575", borderRadius: "8px" }}
                  />
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <>
            {tvShows
              .filter((tvShow) => tvShow.poster_path !== null)
              .map((tvShow) => {
                return (
                  <SwiperSlide key={tvShow.id} virtualIndex={tvShow.id}>
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
