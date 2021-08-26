import React, { FC, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Image from "next/image";
import VideoFallback from "../../../assets/fallbacks/VideoFallback.jpg";
import videoPlayeFallbackrStyles from "../../../styles/Home.module.scss";

interface VideoPlayerFallbackProps {
  open: boolean;
  onClose: () => void;
}

const VideoPlayerFallback: FC<VideoPlayerFallbackProps> = ({
  open,
  onClose,
}) => {
  //Adjusting vh of a window since 100vh is broken on mobile
  useEffect(() => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={videoPlayeFallbackrStyles["video-player-fallback-wrapper"]}
        >
          <div
            className={videoPlayeFallbackrStyles["video-player-fallback-img"]}
          >
            <Image
              src={VideoFallback}
              alt="Video Fallback"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div
            onClick={onClose}
            className={
              videoPlayeFallbackrStyles["video-player-fallback-close-icon"]
            }
          >
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoPlayerFallback;
