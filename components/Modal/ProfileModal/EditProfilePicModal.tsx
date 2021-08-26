import React, { FC, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Image from "next/image";
import { AvatarData } from "../../../data/profiledata";
import editProfilePicStyles from "../../../styles/Home.module.scss";
import SaveProfilePicButton from "../../Buttons/Modal/SaveProfilePicButton";

interface EditProfilePicProps {
  editProfilePicModal: boolean;
  handleCLoseEditProfilePicModal: () => void;
  setEditProfilePicText: React.Dispatch<React.SetStateAction<StaticImageData>>;
  SubmitProfilePicEdit: (id: number) => void;
  profile: { id: number; picture: StaticImageData };
  setEditProfilePic: React.Dispatch<React.SetStateAction<number | boolean>>;
  profilePic: StaticImageData;
}

const EditProfilePicModal: FC<EditProfilePicProps> = ({
  editProfilePicModal,
  handleCLoseEditProfilePicModal,
  setEditProfilePicText,
  SubmitProfilePicEdit,
  profile,
  setEditProfilePic,
  profilePic,
}) => {
  const [focus, setFocus] = useState(false);

  const focusProfilePic = () => setFocus(true);

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
        open={editProfilePicModal}
        onClose={handleCLoseEditProfilePicModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={editProfilePicStyles["edit-profile-pic-wrapper-animation"]}
        >
          <div className={editProfilePicStyles["edit-profile-pic-wrapper"]}>
            <div
              className={
                editProfilePicStyles["edit-profile-pic-close-icon-wrapper"]
              }
            >
              <div
                className={editProfilePicStyles["edit-profile-pic-close-icon"]}
                onClick={() => {
                  setEditProfilePic(false);
                  setEditProfilePicText(profilePic);
                }}
              >
                <i className="fas fa-times-circle"></i>
              </div>
            </div>

            <div className={editProfilePicStyles["edit-profile-pic-title"]}>
              <h1>Choose Profile</h1>
            </div>

            <div className={editProfilePicStyles["profile-pics"]}>
              {AvatarData.map((avatar) => {
                return (
                  <div
                    key={avatar.id}
                    className={editProfilePicStyles["edit-profile-container"]}
                    tabIndex={avatar.tabIndex}
                  >
                    <div className={editProfilePicStyles["choose-profile"]}>
                      <Image src={avatar.avatar} alt="Avatar Profile" />
                    </div>
                    <div
                      className={editProfilePicStyles["edit-profile-overlay"]}
                      onClick={() => {
                        setEditProfilePicText(avatar.avatar);
                        focusProfilePic();
                      }}
                    >
                      <div
                        className={editProfilePicStyles["edit-profile-icon"]}
                      >
                        <i className="far fa-check-circle"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={editProfilePicStyles["edit-profile-pic-button"]}>
              <SaveProfilePicButton
                SubmitProfilePicEdit={SubmitProfilePicEdit}
                focus={focus}
                profile={profile}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProfilePicModal;
