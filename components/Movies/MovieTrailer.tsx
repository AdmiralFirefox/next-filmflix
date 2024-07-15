import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import VideoFallback from "../../assets/fallbacks/VideoFallback.jpg";
import ReactPlayer from "react-player/youtube";
const VideoPlayer = dynamic(() => import("../Modal/VideoPlayer/VideoPlayer"));
import PlayMovieButton from "../Buttons/Movies/PlayMovieButton";
import styles from "../../styles/Movies/MovieTrailer.module.scss";

const MovieTrailer: FC<{ id: number }> = ({ id }) => {
  const [displayTrailer, setDisplayTrailer] = useState({ key: 0 });

  const [isMounted, setIsMounted] = useState(true);

  const [loadingPlayer, setIsLoadingPlayer] = useState(false);

  //Open Video Player Modal
  const [openMovieVideoPlayer, setOpenMovieVideoPlayer] = useState(false);

  const handleOpenMovieVideoPlayer = () => {
    setOpenMovieVideoPlayer(true);
  };

  const handleCloseMovieVideoPlayer = () => {
    setOpenMovieVideoPlayer(false);
  };

  useEffect(() => {
    setIsLoadingPlayer(true);
    const displayTrailer = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        // console.log(res.data.results[0]);
        if (isMounted) {
          setDisplayTrailer(res.data.results[0]);
          setIsLoadingPlayer(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTrailer();

    return () => {
      setIsMounted(false);
    };
  }, [id, isMounted]);

  return (
    <div>
      {loadingPlayer ? (
        <Skeleton variant="rectangular" id={styles["movie-trailer-skeleton"]} />
      ) : (
        <>
          {typeof displayTrailer !== "undefined" ? (
            <>
              <VideoPlayer
                open={openMovieVideoPlayer}
                onClose={handleCloseMovieVideoPlayer}
                src={`https://www.youtube.com/embed/${displayTrailer.key}`}
              />
              <ReactPlayer
                url={`https://www.youtube.com/embed/${displayTrailer.key}`}
                width="100%"
                playing={openMovieVideoPlayer ? false : true}
                controls={true}
                muted={true}
                loop
                height="30em"
              />
              <div className={styles["movie-button-wrappers"]}>
                <div className={styles["play-movie-button"]}>
                  <PlayMovieButton
                    handleOpenMovieVideoPlayer={handleOpenMovieVideoPlayer}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles["movie-trailer-fallback"]}>
                <Image
                  src={VideoFallback}
                  alt="Video Fallback"
                  layout="responsive"
                  quality={100}
                  objectFit="cover"
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MovieTrailer;
