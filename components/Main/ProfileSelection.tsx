import React, { FC, useState, useEffect, createContext } from "react";
import dynamic from "next/dynamic";
const AddProfileModal = dynamic(
  () => import("../Modal/ProfileModal/AddProfileModal")
);
const EditProfileModal = dynamic(
  () => import("../Modal/ProfileModal/EditModalProfile")
);
const EditProfilePicModal = dynamic(
  () => import("../Modal/ProfileModal/EditProfilePicModal")
);
import LogoAnimation from "../LandingPage/LogoAnimation";
const Main = dynamic(() => import("./Main"));
import Image, { StaticImageData } from "next/image";
import WebLogo from "../../assets/logo/WebLogo.png";
import DefaultProfile from "../../assets/profileicons/DefaultAvatar.png";
import ManageProfileButton from "../Buttons/Main/ManageProfileButton";
import styles from "../../styles/Main/ProfileSelection.module.scss";

interface ProfilesProps {
  profileData: {
    id: number;
    name: string;
    picture: StaticImageData;
  }[];
}

interface ProfileSelectionProps {
  signOut: () => Promise<void>;
}

export const ProfileNameContext = createContext("");
export const ProfilePicContext = createContext(DefaultProfile);

const ProfileSelection: FC<ProfileSelectionProps> = ({ signOut }) => {
  //Profile Edit
  const [profiles, setProfiles] = useState<ProfilesProps["profileData"]>([]);
  const [profile, setProfile] = useState("");

  const [profileEdit, setProfileEdit] = useState<boolean | number>(false);
  const [profileTextEdit, setProfileTextEdit] = useState("");

  //Proile Picture Edit
  const [profilePic, setProfilePic] = useState(DefaultProfile);
  const [editProfilePic, setEditProfilePic] = useState<boolean | number>(false);
  const [editProfilePicText, setEditProfilePicText] =
    useState<StaticImageData>(profilePic);

  //Edit Mode
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = (): void => setEditMode(!editMode);

  //When a user Select a Profile
  const [profileSelect, setProfileSelect] = useState(false);

  const selectedProfile = () => setProfileSelect(true);

  const manageProfiles = () => {
    setProfileSelect(false);
    setProfilePic(DefaultProfile);
    setProfile("");
  };

  //Add Profile Modal
  const [openAddProfileModal, setOpenAddProfileModal] = useState(false);

  const handleOpenAddProfileModal = () => {
    setOpenAddProfileModal(true);
  };

  const handleCloseAddProfileModal = () => {
    setOpenAddProfileModal(false);
    setProfile("");
  };

  //Edit Profile Modal
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleOpenEditProfileModal = () => {
    setEditProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setEditProfileModal(false);
    setProfileEdit(false);
    setProfileTextEdit("");
  };

  //Edit Profile Pic Modal
  const [editProfilePicModal, setEditProfilePicModal] = useState(false);

  const handleOpenEditProfilePicModal = () => {
    setEditProfilePicModal(true);
  };

  const handleCLoseEditProfilePicModal = () => {
    setEditProfilePicModal(false);
    setEditProfilePic(false);
    setEditProfilePicText(profilePic);
  };

  //Local Storage for Saving Profiles When Refresh
  useEffect(() => {
    const json = localStorage.getItem("profiles") as string;
    const saveProfiles = JSON.parse(json);

    if (saveProfiles) {
      setProfiles(saveProfiles);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profiles);
    localStorage.setItem("profiles", json);
  }, [profiles]);

  // Local Storage for Selecting a Profile
  useEffect(() => {
    const json = localStorage.getItem("PROFILE_SELECTED") as string;
    const saveProfileSelected = JSON.parse(json);

    if (saveProfileSelected) {
      setProfileSelect(saveProfileSelected);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(profileSelect);
    localStorage.setItem("PROFILE_SELECTED", json);
  }, [profileSelect]);

  //Changing Background Color
  useEffect(() => {
    document.getElementsByTagName("body")[0].className =
      styles["main-background"];

    //Clean up whether it unmounts
    return () => {
      document.getElementsByTagName("body")[0].className = "";
    };
  }, []);

  //Adding New Profiles
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newProfile = {
      id: new Date().getTime(),
      name: profile,
      picture: profilePic,
    };

    setProfiles([...profiles].concat(newProfile));
    setProfile("");
    setOpenAddProfileModal(false);
    setProfilePic(DefaultProfile);
  };

  //Handling Profile Change
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProfile(e.target.value);
  };

  //Removing Profile
  const RemoveProfile = (id: number) => {
    const updatedProfiles = [...profiles].filter(
      (profile) => profile.id !== id
    );

    setProfiles(updatedProfiles);
  };

  //Editing Profile
  const SubmitProfileEdit = (id: number) => {
    const updatedProfiles = [...profiles].map((profile) => {
      if (profile.id === id) {
        profile.name = profileTextEdit;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setProfileEdit(false);
    setProfileTextEdit("");
  };

  //Profile Pic Edit
  const SubmitProfilePicEdit = (id: number) => {
    const updatedProfiles = [...profiles].map((profile) => {
      if (profile.id === id) {
        profile.picture = editProfilePicText;
      }
      return profile;
    });
    setProfiles(updatedProfiles);
    setEditProfilePic(false);
    setEditProfilePicText(profilePic);
  };

  //Profile Edit Mode On
  const profileEditModeOn = (): JSX.Element => {
    return (
      <div className={styles["profile-selection-profiles"]}>
        {profiles.map((profile) => {
          return (
            <div key={profile.id} className={styles["edit-mode-on-wrapper"]}>
              {editProfilePic === profile.id ? (
                <>
                  <EditProfilePicModal
                    editProfilePicModal={editProfilePicModal}
                    handleCLoseEditProfilePicModal={
                      handleCLoseEditProfilePicModal
                    }
                    setEditProfilePicText={setEditProfilePicText}
                    SubmitProfilePicEdit={SubmitProfilePicEdit}
                    profile={profile}
                    setEditProfilePic={setEditProfilePic}
                    profilePic={profilePic}
                  />
                  <div className={styles["edit-mode-on-image-container"]}>
                    <div className={styles["edit-mode-on-image"]}>
                      <Image
                        src={profile.picture}
                        alt="Avatar Profile"
                        onClick={() => {
                          setProfile(profile.name);
                          setProfilePic(profile.picture);
                        }}
                        priority={true}
                      />
                    </div>
                    <div className={styles["edit-mode-on-image-overlay"]}>
                      <div
                        className={styles["edit-mode-on-edit-profile-icon"]}
                        onClick={() => {
                          setEditProfilePic(profile.id);
                          handleOpenEditProfilePicModal();
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles["edit-mode-on-image-container"]}>
                    <div className={styles["edit-mode-on-image"]}>
                      <Image
                        src={profile.picture}
                        alt="Avatar Profile"
                        onClick={() => {
                          setProfile(profile.name);
                          setProfilePic(profile.picture);
                        }}
                        priority={true}
                      />
                    </div>
                    <div className={styles["edit-mode-on-image-overlay"]}>
                      <div
                        className={styles["edit-mode-on-edit-profile-icon"]}
                        onClick={() => {
                          setEditProfilePic(profile.id);
                          handleOpenEditProfilePicModal();
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {profileEdit === profile.id ? (
                <div className={styles["edit-mode-on-profile-name-wrapper"]}>
                  <EditProfileModal
                    editProfileModal={editProfileModal}
                    handleCloseEditProfileModal={handleCloseEditProfileModal}
                    setProfileTextEdit={setProfileTextEdit}
                    profile={profile}
                    SubmitProfileEdit={SubmitProfileEdit}
                    profileTextEdit={profileTextEdit}
                    setProfileEdit={setProfileEdit}
                    profiles={profiles}
                  />
                  <h1 className={styles["edit-mode-on-profile-name"]}>
                    {profile.name}
                  </h1>
                  <div
                    className={styles["edit-mode-on-edit-name-icon"]}
                    onClick={() => {
                      setProfileEdit(profile.id);
                      handleOpenEditProfileModal();
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </div>
                </div>
              ) : (
                <div className={styles["edit-mode-on-profile-name-wrapper"]}>
                  <h1 className={styles["edit-mode-on-profile-name"]}>
                    {profile.name}
                  </h1>
                  <div
                    className={styles["edit-mode-on-edit-name-icon"]}
                    onClick={() => {
                      setProfileEdit(profile.id);
                      handleOpenEditProfileModal();
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </div>
                </div>
              )}

              <div
                className={styles["edit-mode-on-remove-profile-icon"]}
                onClick={() => RemoveProfile(profile.id)}
              >
                <i className="fas fa-times-circle"></i>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  //Profile Edit Mode Off
  const profileEditModeOff = (): JSX.Element => {
    return (
      <div className={styles["profile-selection-profiles"]}>
        {profiles.map((profile) => {
          return (
            <div key={profile.id} className={styles["edit-mode-off-wrapper"]}>
              <div className={styles["edit-mode-off-image"]}>
                <Image
                  src={profile.picture}
                  alt="Avatar Profile"
                  onClick={() => {
                    selectedProfile();
                    setProfile(profile.name);
                    setProfilePic(profile.picture);
                  }}
                  priority={true}
                />
              </div>

              <h1 className={styles["edit-mode-off-profile-name"]}>
                {profile.name}
              </h1>
            </div>
          );
        })}

        {/* Add Profiles */}
        {profiles.length !== 5 && (
          <>
            {editMode ? null : (
              <>
                <div
                  onClick={handleOpenAddProfileModal}
                  className={styles["add-profile-icon"]}
                >
                  <i className="fas fa-plus-circle"></i>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  };

  //Editing Profiles
  const editProfiles = (): JSX.Element => {
    if (editMode === true) {
      return <>{profileEditModeOn()}</>;
    } else {
      return <>{profileEditModeOff()}</>;
    }
  };

  //If a Profile is Selected
  const profileSelected = (): JSX.Element => {
    if (profileSelect === true) {
      return (
        <ProfilePicContext.Provider value={profilePic}>
          <ProfileNameContext.Provider value={profile}>
            <Main manageProfiles={manageProfiles} signOut={signOut} />
          </ProfileNameContext.Provider>
        </ProfilePicContext.Provider>
      );
    } else {
      return (
        <>
          <AddProfileModal
            openAddProfileModal={openAddProfileModal}
            handleCloseAddProfileModal={handleCloseAddProfileModal}
            profile={profile}
            handleProfileSubmit={handleProfileSubmit}
            handleProfileChange={handleProfileChange}
            setProfile={setProfile}
            profiles={profiles}
          />
          <div className={styles["profile-selection-wrapper"]}>
            <div className={styles["profile-selection-web-logo"]}>
              <Image
                src={WebLogo}
                alt="Web Logo"
                width={150}
                height={50}
                objectFit="cover"
              />
            </div>
            <div className={styles["profile-selection-title"]}>
              <h1>Who&apos;s Watching?</h1>
            </div>

            {editProfiles()}

            {/* Manage Profiles Profiles */}
            <div>
              <ManageProfileButton
                profiles={profiles}
                toggleEditMode={toggleEditMode}
                editMode={editMode}
              />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <LogoAnimation />
      <div className={styles["whole-profile-main-wrapper"]}>
        {profileSelected()}
      </div>
    </>
  );
};

export default ProfileSelection;
