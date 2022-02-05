import React, { FC, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Image from "next/image";
import {
  ProfileNameContext,
  ProfilePicContext,
} from "../../Main/ProfileSelection";
import { withStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../../../styles/Modal/Main/ProfileModal.module.scss";

interface ProfileModalProps {
  openProfileModal: boolean;
  handleCloseProfileModal: () => void;
  manageProfiles: () => void;
  signOut: () => Promise<void>;
}

const BlueButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#0071EB",
    "&:hover": {
      backgroundColor: "hsl(211, 100%, 60%)",
    },
  },
}))(Button);

const RedButtonClick = withStyles((theme: Theme) => ({
  root: {
    color: "#fff",
    backgroundColor: "#E50914",
    "&:hover": {
      backgroundColor: "hsl(357, 92%, 60%)",
    },
  },
}))(Button);

const ProfileModal: FC<ProfileModalProps> = ({
  openProfileModal,
  handleCloseProfileModal,
  manageProfiles,
  signOut,
}) => {
  const profilePic = useContext(ProfilePicContext);
  const profile = useContext(ProfileNameContext);

  return (
    <>
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={styles["profile-info-modal-wrapper-animation"]}
        >
          <div className={styles["profile-info-modal-wrapper"]}>
            <div
              className={styles["profile-info-modal-close-icon"]}
              onClick={handleCloseProfileModal}
            >
              <i className="fas fa-times-circle"></i>
            </div>
            <div className={styles["profile-info-user-info"]}>
              <div className={styles["profile-info-user-image"]}>
                <Image src={profilePic} alt="Avatar Profile" />
              </div>
              <div className={styles["profile-info-user-name"]}>
                <h1>{profile}</h1>
              </div>
            </div>
            <div className={styles["profile-info-button-wrapper"]}>
              <BlueButtonClick
                variant="contained"
                color="primary"
                onClick={manageProfiles}
              >
                Manage Profiles
              </BlueButtonClick>
              <RedButtonClick
                variant="contained"
                color="primary"
                onClick={signOut}
              >
                Sign Out
              </RedButtonClick>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
