import React, { FC } from "react";
import { useWindowSize, Size } from "../../../hooks/useWindowSize";
import Modal from "@material-ui/core/Modal";
import ReactPlayer from "react-player/lazy";
import styles from "../../../styles/Modal/VideoPlayer/VideoPlayer.module.scss";

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ open, onClose, src }) => {
  const size: Size = useWindowSize();

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles["video-player-wrapper"]}>
          <ReactPlayer
            url={src}
            width="100%"
            playing
            controls
            loop
            muted={false}
            height={size.height}
          />
          <div onClick={onClose} className={styles["video-player-close-icon"]}>
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VideoPlayer;
