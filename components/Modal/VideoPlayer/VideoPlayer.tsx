import React, { FC } from "react";
import Modal from "@material-ui/core/Modal";
import ReactPlayer from "react-player/lazy";
import videoPlayerStyles from "../../../styles/Home.module.scss";

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ open, onClose, src }) => {
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
            height="95vh"
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
