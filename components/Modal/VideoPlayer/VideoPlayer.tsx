import React, { FC, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import ReactPlayer from "react-player/lazy";
import videoPlayerStyles from "../../../styles/Home.module.scss";

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ open, onClose, src }) => {
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
        <div className={videoPlayerStyles["video-player-wrapper"]}>
          <ReactPlayer
            url={src}
            width="100%"
            playing
            controls
            loop
            muted={false}
            height="calc(var(--vh, 1vh) * 100)"
          />
          <div
            onClick={onClose}
            className={videoPlayerStyles["video-player-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoPlayer;
