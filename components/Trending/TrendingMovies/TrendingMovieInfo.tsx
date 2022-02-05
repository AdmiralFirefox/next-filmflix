import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { TrendingMovieIDContext } from "./TrendingMovies";
import Axios from "axios";
import Image from "next/image";
import MoreMovieInfoButton from "../../Buttons/TrendingMovies/MoreMovieInfoButton";
const PlayMovieVideoButton = dynamic(
  () => import("../../Buttons/TrendingMovies/PlayMovieVideoButton")
);
import Skeleton from "@material-ui/lab/Skeleton";
import FallbackButton from "../../Buttons/FallbackButton/FallbackButton";
const MovieModal = dynamic(() => import("../../Modal/Movies/MovieModal"));
import styles from "../../../styles/Trending/TrendingMovies/TrendingMovieInfo.module.scss";

const { NEXT_PUBLIC_API_KEY } = process.env;

interface GenreProp {
  genreData: {
    id: number;
    name: string;
  }[];
}

interface TrendingMovieInfoProps {
  backdropPath: string;
  title: string;
  overview: string;
}

interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
}

const TrendingMovieInfo: FC<TrendingMovieInfoProps> = ({
  backdropPath,
  title,
  overview,
}) => {
  const [trendingMovieInfo, setTrendingMovieInfo] = useState({
    title: "",
    overview: "",
    release_date: 0,
    runtime: 0,
    status: "",
    id: 0,
  });

  const trendingMovieID = useContext(TrendingMovieIDContext);

  const [genres, setGenres] = useState<GenreProp["genreData"]>([]);

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

  const [isMounted, setIsMounted] = useState(true);

  // Trending Movie Modal Info
  const [openTrendingMovieModal, setOpenTrendingMovieModal] = useState(false);

  const handleOpenTrendingMovieModal = (): void => {
    setOpenTrendingMovieModal(true);
  };

  const handleCloseTrendingMovieModal = (): void => {
    setOpenTrendingMovieModal(false);
  };

  useEffect(() => {
    const displayTrendingMovieInfo = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${trendingMovieID}?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // console.log(res.data);
        if (isMounted) {
          setTrendingMovieInfo(res.data);
          setGenres(res.data.genres);
          setSpokenLanguages(res.data.spoken_languages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTrendingMovieInfo();

    return () => {
      setIsMounted(false);
    };
  }, [trendingMovieID, isMounted]);

  //Limiting the Words in Overview
  let limitText = (text: string, limit: number) => {
    if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
        if (
          text.charAt(i) === " " &&
          (text.charAt(i - 1) != "," ||
            text.charAt(i - 1) != "." ||
            text.charAt(i - 1) != ";")
        ) {
          return text.substring(0, i) + "...";
        }
      }
      return text.substring(0, limit) + "...";
    } else return text;
  };

  return (
    <>
      <MovieModal
        open={openTrendingMovieModal}
        handleCloseMovieModal={handleCloseTrendingMovieModal}
        overview={trendingMovieInfo.overview}
        releaseDate={trendingMovieInfo.release_date}
        genres={genres}
        runtime={trendingMovieInfo.runtime}
        status={trendingMovieInfo.status}
        title={trendingMovieInfo.title}
        id={trendingMovieInfo.id}
        spokenLanguages={spokenLanguages}
      />
      {backdropPath !== "" ? (
        <div className={styles["trending-movie-img"]}>
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${backdropPath}`}
            alt="Movie Poster"
            priority={true}
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            unoptimized={true}
          />
        </div>
      ) : (
        <>
          <Skeleton
            variant="rect"
            id={styles["trending-movie-skeleton"]}
          />
        </>
      )}
      <div className={styles["trending-movie-content"]}>
        <div className={styles["trending-movie-title"]}>
          <h1>{title}</h1>
        </div>
        <div className={styles["trending-movie-overview"]}>
          <p>{limitText(overview, 500)}</p>
        </div>
        <div
          className={styles["trending-movie-button-wrapper"]}
        >
          {trendingMovieInfo.id !== 0 ? (
            <>
              <PlayMovieVideoButton id={trendingMovieInfo.id} />
            </>
          ) : (
            <FallbackButton />
          )}

          <MoreMovieInfoButton
            handleOpenTrendingMovieModal={handleOpenTrendingMovieModal}
          />
        </div>
      </div>
      <div
        className={styles["trending-movie-gradient-shadow"]}
      ></div>
    </>
  );
};

export default TrendingMovieInfo;
