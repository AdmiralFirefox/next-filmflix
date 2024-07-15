import React, { FC, useContext } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/legacy/image";
import {
  ProfileNameContext,
  ProfilePicContext,
} from "../../Main/ProfileSelection";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import styles from "../../../styles/Modal/Main/ProfileModal.module.scss";

interface ProfileModalProps {
  openProfileModal: boolean;
  handleCloseProfileModal: () => void;
  manageProfiles: () => void;
  signOut: () => Promise<void>;
}

const BlueButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const RedButtonClick = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#E50914",
  "&:hover": {
    backgroundColor: "hsl(357, 92%, 60%)",
  },
}));

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
        <div className={styles["profile-info-modal-wrapper-animation"]}>
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
              <BlueButtonClick variant="contained" onClick={manageProfiles}>
                Manage Profiles
              </BlueButtonClick>
              <RedButtonClick variant="contained" onClick={signOut}>
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
