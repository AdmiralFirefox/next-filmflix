import React, { FC } from "react";
import { useWindowSize, Size } from "../../../hooks/useWindowSize";
import Modal from "@mui/material/Modal";
import Image from "next/legacy/image";
import VideoFallback from "../../../assets/fallbacks/VideoFallback.jpg";
import styles from "../../../styles/Modal/VideoPlayer/VideoPlayerFallback.module.scss";

interface VideoPlayerFallbackProps {
  open: boolean;
  onClose: () => void;
}

const VideoPlayerFallback: FC<VideoPlayerFallbackProps> = ({
  open,
  onClose,
}) => {
  const size: Size = useWindowSize();

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles["video-player-fallback-wrapper"]}>
          <div
            className={styles["video-player-fallback-img"]}
            style={{ height: `${size.height}px` }}
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
            className={styles["video-player-fallback-close-icon"]}
          >
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoPlayerFallback;
