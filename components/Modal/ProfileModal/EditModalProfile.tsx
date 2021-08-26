import React, { FC, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import editProfileModalStyles from "../../../styles/Home.module.scss";
import EditProfileModalInput from "../../Inputs/Modal/EditProfileModalInput";
import SubmitEditProfileButton from "../../Buttons/Modal/SubmitEditProfileButton";
import CancelEditProfileButton from "../../Buttons/Modal/CancelEditProfileButton";

interface EditModalProps {
  editProfileModal: boolean;
  handleCloseEditProfileModal: () => void;
  setProfileTextEdit: React.Dispatch<React.SetStateAction<string>>;
  profile: { name: string; id: number };
  SubmitProfileEdit: (id: number) => void;
  profileTextEdit: string;
  setProfileEdit: React.Dispatch<React.SetStateAction<number | boolean>>;
  profiles: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
}

const EditProfileModal: FC<EditModalProps> = ({
  editProfileModal,
  handleCloseEditProfileModal,
  setProfileTextEdit,
  profile,
  SubmitProfileEdit,
  profileTextEdit,
  setProfileEdit,
  profiles,
}) => {
  useEffect(() => {
    if (profileTextEdit.length >= 15) {
      alert("Word limit is 15 characters");
      setProfileTextEdit("");
    }
    if (profiles.map((profile) => profile.name).includes(profileTextEdit)) {
      alert("Name already exist. Please enter a different name.");
      setProfileTextEdit("");
    }
  }, [profileTextEdit, profiles, setProfileTextEdit]);

  return (
    <>
      <Modal
        open={editProfileModal}
        onClose={handleCloseEditProfileModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={
            editProfileModalStyles["edit-profile-modal-wrapper-animation"]
          }
        >
          <div className={editProfileModalStyles["edit-profile-modal-wrapper"]}>
            <div
              className={editProfileModalStyles["edit-profile-modal-content"]}
            >
              <div
                className={editProfileModalStyles["edit-profile-modal-title"]}
              >
                <h1>Who&apos;s Watching?</h1>
              </div>
              <div>
                <EditProfileModalInput
                  setProfileTextEdit={setProfileTextEdit}
                  profile={profile}
                />
              </div>
              <div
                className={
                  editProfileModalStyles["edit-profile-modal-button-wrapper"]
                }
              >
                <SubmitEditProfileButton
                  SubmitProfileEdit={SubmitProfileEdit}
                  profile={profile}
                  profileTextEdit={profileTextEdit}
                />
                <CancelEditProfileButton
                  setProfileEdit={setProfileEdit}
                  setProfileTextEdit={setProfileTextEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
