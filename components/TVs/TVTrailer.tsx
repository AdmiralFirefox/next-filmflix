import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import VideoFallback from "../../assets/fallbacks/VideoFallback.jpg";
import ReactPlayer from "react-player/youtube";
const VideoPlayer = dynamic(() => import("../Modal/VideoPlayer/VideoPlayer"));
import PlayTVButton from "../Buttons/TVs/PlayTVButton";
import styles from "../../styles/TVs/TVTrailer.module.scss";

const TVTrailer: FC<{ id: number }> = ({ id }) => {
  const [trailerTV, setTrailerTV] = useState({ key: 0 });

  const [isMounted, setIsMounted] = useState(true);

  const [loadingPlayer, setIsLoadingPlayer] = useState(false);

  //Open Video Player Modal
  const [openTVVideoPlayer, setOpenTVVideoPlayer] = useState(false);

  const handleOpenTVVideoPlayer = () => {
    setOpenTVVideoPlayer(true);
  };

  const handleCloseTVVideoPlayer = () => {
    setOpenTVVideoPlayer(false);
  };

  useEffect(() => {
    const displayTVTrailer = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
          options
        );
        // console.log(res.data.results[0]);
        if (isMounted) {
          setTrailerTV(res.data.results[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTVTrailer();

    return () => {
      setIsMounted(false);
    };
  }, [id, isMounted]);

  return (
    <div>
      {loadingPlayer ? (
        <Skeleton variant="rectangular" id={styles["tv-trailer-skeleton"]} />
      ) : (
        <>
          {typeof trailerTV !== "undefined" ? (
            <>
              <VideoPlayer
                open={openTVVideoPlayer}
                onClose={handleCloseTVVideoPlayer}
                src={`https://www.youtube.com/embed/${trailerTV.key}`}
              />
              <ReactPlayer
                url={`https://www.youtube.com/embed/${trailerTV.key}`}
                width="100%"
                playing={openTVVideoPlayer ? false : true}
                controls={true}
                muted={true}
                loop
                height="30em"
              />
              <div className={styles["tv-button-wrappers"]}>
                <div className={styles["play-tv-button"]}>
                  <PlayTVButton
                    handleOpenTVVideoPlayer={handleOpenTVVideoPlayer}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles["tv-trailer-fallback"]}>
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

export default TVTrailer;
