import React, { FC, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import addProfileModalStyles from "../../../styles/Home.module.scss";
import AddProfileModalInput from "../../Inputs/Modal/AddProfileModalInput";
import AddProfileModalButton from "../../Buttons/Modal/AddProfileModalButton";
import CancelProfileAddModalButton from "../../Buttons/Modal/CancelProfileAddButton";

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
  useEffect(() => {
    if (profile.length >= 15) {
      alert("Word limit is 15 characters");
      setProfile("");
    }

    if (profiles.map((profile) => profile.name).includes(profile)) {
      alert("Name already exist. Please enter a different name.");
      setProfile("");
    }
  }, [profile, profiles, setProfile]);

  return (
    <>
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
