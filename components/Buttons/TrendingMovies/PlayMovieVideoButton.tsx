import React, { FC, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Axios from "axios";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
const VideoPlayerFallback = dynamic(
  () => import("../../Modal/VideoPlayer/VideoPlayerFallback")
);
const VideoPlayer = dynamic(
  () => import("../../Modal/VideoPlayer/VideoPlayer")
);

const { NEXT_PUBLIC_API_KEY } = process.env;

const PlayButton = withStyles((theme: Theme) => ({
  root: {
    color: "#000",
    backgroundColor: "hsl(0, 0%, 100%)",
    "&:hover": {
      backgroundColor: "hsl(0, 0%, 80%)",
    },
  },
}))(Button);

const PlayMovieVideoButton: FC<{ id?: number }> = ({ id }) => {
  const [displayTrailer, setDisplayTrailer] = useState({ key: 0 });

  const [isMounted, setIsMounted] = useState(true);

  //Open Video Player Modal
  const [openMovieVideoPlayer, setOpenMovieVideoPlayer] = useState(false);

  const handleOpenMovieVideoPlayer = () => {
    setOpenMovieVideoPlayer(true);
  };

  const handleCloseMovieVideoPlayer = () => {
    setOpenMovieVideoPlayer(false);
  };

  useEffect(() => {
    const displayTrailer = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        // console.log(res.data.results[0]);
        if (isMounted) {
          setDisplayTrailer(res.data.results[0]);
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
    <>
      {displayTrailer !== undefined ? (
        <VideoPlayer
          open={openMovieVideoPlayer}
          onClose={handleCloseMovieVideoPlayer}
          src={`https://www.youtube.com/embed/${displayTrailer.key}`}
        />
      ) : (
        <VideoPlayerFallback
          open={openMovieVideoPlayer}
          onClose={handleCloseMovieVideoPlayer}
        />
      )}

      <PlayButton
        variant="contained"
        color="primary"
        endIcon={<PlayArrowIcon />}
        onClick={handleOpenMovieVideoPlayer}
      >
        Play
      </PlayButton>
    </>
  );
};

export default PlayMovieVideoButton;
