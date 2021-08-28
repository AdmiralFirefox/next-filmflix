import React, { FC, useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import addProfileModalStyles from "../../../styles/Home.module.scss";
import AddProfileModalInput from "../../Inputs/Modal/AddProfileModalInput";
import AddProfileModalButton from "../../Buttons/Modal/AddProfileModalButton";
import CancelProfileAddModalButton from "../../Buttons/Modal/CancelProfileAddButton";

// Material UI Snackbar Import
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface AddProfileModalProps {
  openAddProfileModal: boolean;
  handleCloseAddProfileModal: () => void;
  handleProfileSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
}

const AddProfileModal: FC<AddProfileModalProps> = ({
  openAddProfileModal,
  handleCloseAddProfileModal,
  handleProfileSubmit,
  handleProfileChange,
  profile,
  setProfile,
  profiles,
}) => {
  const [openAlertError, setOpenAlertError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleOpenAlertError = () => {
    setOpenAlertError(true);
  };

  const handleCloseAlertError = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  useEffect(() => {
    if (profile.length >= 15) {
      handleOpenAlertError();
      setAlertMessage("Word limit is 15 characters.");
      setProfile("");
    }

    if (profiles.map((profile) => profile.name).includes(profile)) {
      handleOpenAlertError();
      setAlertMessage("Name already exist. Please enter a different name.");
      setProfile("");
    }
  }, [profile, profiles, setProfile]);

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openAlertError}
        autoHideDuration={5000}
        onClose={handleCloseAlertError}
        message={alertMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseAlertError}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Modal
        open={openAddProfileModal}
        onClose={handleCloseAddProfileModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={
            addProfileModalStyles["add-profile-modal-wrapper-animation"]
          }
        >
          <div className={addProfileModalStyles["add-profile-modal-wrapper"]}>
            <div className={addProfileModalStyles["add-profile-modal-title"]}>
              <h1>What&apos;s your Name?</h1>
            </div>
            <form
              onSubmit={handleProfileSubmit}
              className={addProfileModalStyles["add-profile-modal-form"]}
            >
              <div>
                <AddProfileModalInput
                  handleProfileChange={handleProfileChange}
                />
              </div>
              <div
                className={
                  addProfileModalStyles["add-profile-modal-button-wrapper"]
                }
              >
                <AddProfileModalButton profile={profile} />
                <CancelProfileAddModalButton
                  setProfile={setProfile}
                  handleCloseAddProfileModal={handleCloseAddProfileModal}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProfileModal;
